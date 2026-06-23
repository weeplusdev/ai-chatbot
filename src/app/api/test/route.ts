export async function GET() {
    return Response.json({
      keyExists: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });
  }