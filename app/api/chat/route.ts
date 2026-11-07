import { NextResponse } from 'next/server';

// Lite dicoba dulu (lebih cepat), model utama jadi cadangan.
const MODELS = ['gemini-3.5-flash-lite', 'gemini-3.8-flash'];

const systemInstructionText = `You are 'Lesbot', an empathetic, warm, and professional AI mental health companion for the Lestari portal.

CORE OBJECTIVES:
1. Prioritize the user's mental well-being, emotional safety, and comfort above all else. Listen actively, validate their feelings, and offer gentle, constructive support.
2. Maintain natural conversational continuity. Read the full chat history carefully so your response is contextual and directly addresses what the user shares.
3. Keep responses warm and human-like, not robotic or clinical. Adapt the length to the user's message:
   - For short or casual messages, reply in 2-4 sentences.
   - When the user shares something emotional or long, reply more fully (about 2-3 short paragraphs): reflect back what they said, validate their feelings, and offer gentle perspective or one small, practical suggestion.
   - Ask at most one gentle follow-up question.
   - Avoid long bullet lists; write in natural, flowing paragraphs.

LANGUAGE RULES:
- Detect the language of the user's LATEST message and reply in that same language.
- If the user writes in Indonesian, reply in warm, natural, casual Indonesian (aku/kamu).
- If the user writes in English, reply in natural English.
- If the user switches language mid-conversation, switch with them.
- Never mention that you are detecting or switching languages.

SAFETY RULES:
- You are a supportive companion, not a doctor or therapist. Never diagnose, and never recommend medication or dosages.
- If the user mentions wanting to die, hurting themselves, or harming others, respond with calm warmth, take them seriously, and gently encourage them to reach out right now to someone they trust or to local emergency services / a crisis hotline. Do not give any method or details about self-harm.
- Never judge, lecture, or minimize their feelings.
- For serious or ongoing problems, gently suggest talking to a psychologist or psychiatrist.`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  try {
    const raw = await req.json();

    const messagesHistory = raw.messagesHistory ?? raw.messages ?? raw.history;
    const mood = raw.mood;

    if (!Array.isArray(messagesHistory)) {
      return NextResponse.json(
        { error: 'messagesHistory harus berupa array' },
        { status: 400 }
      );
    }

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY belum disetel di .env.local' },
        { status: 500 }
      );
    }

    // Ambil 16 pesan terakhir, lalu pastikan riwayat dimulai dari pesan user.
    let cleanHistory = messagesHistory.slice(-16);
    const firstUser = cleanHistory.findIndex((m: any) => m.type === 'user');
    cleanHistory = firstUser === -1 ? [] : cleanHistory.slice(firstUser);

    if (cleanHistory.length === 0) {
      return NextResponse.json({ error: 'Tidak ada pesan user.' }, { status: 400 });
    }

    const body = {
      systemInstruction: {
        parts: [
          {
            text:
              systemInstructionText +
              (mood ? `\n\nUser's reported mood: ${mood}` : '')
          }
        ]
      },
      contents: cleanHistory.map((m: any) => ({
        role: m.type === 'user' ? 'user' : 'model',
        parts: [{ text: m.message }]
      })),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.8
      }
    };

    let response: Response | null = null;
    let data: any = null;

    for (const model of MODELS) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

      try {
        response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(20000)
        });
        data = await response.json();
      } catch (e) {
        // timeout / jaringan: langsung coba model berikutnya
        response = null;
        data = { error: { message: 'Koneksi ke AI timeout atau gagal.' } };
        continue;
      }

      if (response.ok) break; // berhasil

      // 503 (overload) / 429 (kuota): jeda singkat lalu model berikutnya
      if (response.status === 503 || response.status === 429) {
        await sleep(500);
      }
    }

    if (!response || !response.ok) {
      console.error('GEMINI GAGAL:', response?.status, data?.error?.message);
      return NextResponse.json(
        { error: data?.error?.message || 'Gemini error' },
        { status: response?.status || 502 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return NextResponse.json(
        { error: 'Respons dari Gemini kosong.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error('ROUTE ERROR:', err?.message);
    return NextResponse.json(
      { error: err?.message || 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}