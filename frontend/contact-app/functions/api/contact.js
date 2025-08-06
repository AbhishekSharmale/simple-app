export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    const body = await request.json();
    const { name, mobile, email } = body;
    
    if (!name || !mobile || !email) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contact = {
      id: Date.now(),
      name, mobile, email,
      timestamp: new Date().toISOString()
    };

    let contacts = [];
    try {
      const existing = await env.CONTACTS.get('contacts');
      if (existing) contacts = JSON.parse(existing);
    } catch (e) {}

    contacts.push(contact);
    await env.CONTACTS.put('contacts', JSON.stringify(contacts));

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Contact saved successfully' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}