export default async function handler(req, res) {
  console.log('API Request received:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const HF_TOKEN = process.env.HF_TOKEN;
  if (!HF_TOKEN) {
    console.error('Environment variable HF_TOKEN is missing');
    return res.status(500).json({ error: 'HF_TOKEN not configured in Vercel environment variables' });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    console.log('Calling Hugging Face API...');
    const response = await fetch(
      'https://router.huggingface.co/hf-inference/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HF_TOKEN}`,
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-7B-Instruct',
          messages,
          max_tokens: 512,
          temperature: 0.7,
          top_p: 0.95,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('HF API error response:', response.status, errText);
      return res.status(response.status).json({ 
        error: `Hugging Face API error: ${response.status}`,
        details: errText 
      });
    }

    const data = await response.json();
    console.log('HF API call successful');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      message: error.message
    });
  }
}


