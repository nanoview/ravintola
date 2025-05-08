import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  specialRequests?: string;
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_KEY = Deno.env.get('SUPABASE_KEY') || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase configuration environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

serve(async (req) => {
  try {
    const { name, email, phone, guests, date, time, specialRequests } = await req.json() as ReservationData;

    // Insert reservation data into Supabase
    const { data, error } = await supabase
      .from('reservations') // Replace 'reservations' with your table name
      .insert([
        { name, email, phone, guests, date, time, special_requests: specialRequests },
      ]);

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    // Send email notification (existing logic)
    const SMTP_HOST = Deno.env.get('SMTP_HOST') || '';
    const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
    const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
    const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';
    const OWNER_EMAIL = Deno.env.get('OWNER_EMAIL') || '';

    if (!SMTP_HOST || !SMTP_USERNAME || !SMTP_PASSWORD || !OWNER_EMAIL) {
      throw new Error('Missing email configuration environment variables');
    }

    const client = new SmtpClient();
    await client.connectTLS({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USERNAME,
      password: SMTP_PASSWORD,
    });

    await client.send({
      from: SMTP_USERNAME,
      to: OWNER_EMAIL,
      subject: `New Reservation: ${name} for ${guests} on ${date}`,
      content: `
        <h1>New Reservation Received</h1>
        <p>A new reservation has been made through your website.</p>
        <h2>Reservation Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Guests:</strong> ${guests}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          ${specialRequests ? `<li><strong>Special Requests:</strong> ${specialRequests}</li>` : ''}
        </ul>
        <p>Please log in to your dashboard to confirm or cancel this reservation.</p>
      `,
      html: true,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error:', error);

    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
