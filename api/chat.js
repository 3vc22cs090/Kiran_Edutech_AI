import { HfInference } from '@huggingface/inference';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const HF_TOKEN = process.env.HF_TOKEN;
  if (!HF_TOKEN) {
    return res.status(500).json({ error: 'HF_TOKEN not configured in Vercel environment variables' });
  }

  const hf = new HfInference(HF_TOKEN);

  try {
    const { messages } = req.body;
    
    // Use the official SDK for chat completion
    const response = await hf.chatCompletion({
      model: 'Qwen/Qwen2.5-7B-Instruct',
      messages: messages,
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('HF SDK error:', error);
    return res.status(error.status || 500).json({ 
      error: 'Hugging Face Error', 
      message: error.message 
    });
  }
}



