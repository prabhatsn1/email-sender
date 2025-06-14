export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Dummy response logic
    return new Response(
      JSON.stringify({
        message: "Dummy POST API called successfully",
        receivedData: body,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `An error occurred- ${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
