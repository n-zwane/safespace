# SafeSpace - GBV Support Platform

This repository contains the source code for **SafeSpace**, a digital platform built to protect and empower survivors of gender-based violence (GBV) in South Africa. The platform was developed during the **Telkom 10x Hackathon**, hosted by Geekulcha.

---

## About the Platform

Gender-based violence in South Africa is a national crisis. Survivors often face silence, stigma, and delays when reaching out for help. SafeSpace was built to bridge the gap between survivors and the support they need, regardless of their location or the device they have access to.

The platform provides:

- A one-click emergency alert that shares the user's live location via SMS
- Access to 24/7 multilingual hotlines and counsellors
- USSD and SMS functionality for users in rural areas or without smartphones
- A safety directory connecting survivors to shelters, legal aid, and counselling services
- A disguise mode and quick-exit feature for discreet, safe browsing
- Multilingual support across English, isiZulu, and Afrikaans

---

## Features

- **Emergency Alert System** - Triggers an SMS with a live Google Maps link to a designated emergency contact
- **USSD Backend** - Allows feature phone users to access reporting and support via Africa's Talking USSD gateway
- **SMS Integration** - Powered by the Africa's Talking SMS API
- **Safety Directory** - Curated list of shelters, hotlines, and legal resources across South Africa
- **AI Chat Assistant** - Keyword-based chat providing immediate guidance on reporting, shelters, and emergency contacts
- **Offline Detection** - Notifies users when connectivity is lost and highlights accessible alternatives

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Python (Flask)
- Africa's Talking API (SMS and USSD)
- Git and GitHub

---

## Environment Variables

This project uses a `.env` file for sensitive credentials. Do not commit this file. Create your own `.env` with the following keys:

```
AFRICAS_TALKING_USERNAME=your_username
AFRICAS_TALKING_API_KEY=your_api_key
EMERGENCY_NUMBER=your_emergency_contact_number
```

---

## Running Locally

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Create a `.env` file with your credentials (see above)
4. Run the Flask app:
   ```
   python app.py
   ```
5. Visit `http://localhost:5000` in your browser

---

## Developer

Built by **Nicoroy Zwane** as a solo submission for the Telkom 10x Hackathon 2025.

- Designed and developed the full frontend and backend from scratch
- Integrated Africa's Talking for SMS and USSD functionality
- Built multilingual USSD flows across English, isiZulu, and Afrikaans
- Implemented emergency alerting with real-time geolocation

---

## License

This project is proprietary.  
All rights reserved 2025 by **Nicoroy Zwane**.

The code is made publicly visible for portfolio and educational purposes only.  
You may not reuse, reproduce, modify, or distribute this code without prior written permission from the author.

For permissions or inquiries, contact: [nicoroyzwane@gmail.com](mailto:nicoroyzwane@gmail.com)

---

## Acknowledgments

Special thanks to the **Geekulcha** and **Telkom 10x Hackathon** teams, the mentors, and all the innovators I connected with during the event. This platform is just the beginning.
