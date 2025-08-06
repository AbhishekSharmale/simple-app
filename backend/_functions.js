export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // API Routes
    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { name, mobile, email } = body;
        
        if (!name || !mobile || !email) {
          return new Response(JSON.stringify({ error: 'All fields are required' }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        const contact = {
          id: Date.now(),
          name,
          mobile,
          email,
          timestamp: new Date().toISOString()
        };

        // Store in KV storage (Cloudflare Workers KV)
        const contactsKey = 'contacts';
        let contacts = [];
        
        try {
          const existingContacts = await env.CONTACTS_KV.get(contactsKey);
          if (existingContacts) {
            contacts = JSON.parse(existingContacts);
          }
        } catch (e) {
          contacts = [];
        }

        contacts.push(contact);
        await env.CONTACTS_KV.put(contactsKey, JSON.stringify(contacts));

        return new Response(JSON.stringify({ 
          success: true, 
          message: 'Contact saved successfully', 
          id: contact.id 
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Server error' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // Get contacts
    if (url.pathname === '/api/contacts' && request.method === 'GET') {
      try {
        const contactsKey = 'contacts';
        const contacts = await env.CONTACTS_KV.get(contactsKey);
        
        return new Response(contacts || '[]', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        return new Response('[]', {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    return new Response('Not Found', { status: 404 });
  },
};