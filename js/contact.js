const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      form.reset();
      if (success) success.style.display = 'block';
      btn.textContent = 'Sent!';
    } else {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      alert('Something went wrong — please email us directly at maxd@ittechs.io');
    }
  });
}
