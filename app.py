# app.py
from flask import Flask, render_template, request, Response, jsonify
from sms import send_sms

app = Flask(__name__)

# --- Web Homepage + SMS ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/report')
def report():
    return render_template('report.html')

@app.route('/safetydirectory')
def safetydirectory():
    return render_template('safetydirectory.html')

@app.route('/downloads')
def downloads():
    return render_template('downloads.html')

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/shelters')
def shelters():
    return render_template('shelters.html')

@app.route('/safety')
def safety():
    return render_template('safety.html')

@app.route('/maps')
def maps():
    return render_template('maps.html')

@app.route('/send', methods=['POST'])
def send():
    number = request.form.get('number')
    message = request.form.get('message')
    response = send_sms(number, message)

    if response:
        return render_template('index.html', success="SMS sent successfully!")
    else:
        return render_template('index.html', error="Failed to send SMS. Try again.")
    
    
# --- Emergency Alert Endpoint ---
@app.route("/send-alert", methods=["POST"])
def send_alert():
    data = request.get_json()
    lat, lon = data["lat"], data["lon"]

    # Build Google Maps link
    maps_link = f"https://maps.google.com/?q={lat},{lon}"
    message = f"🚨 EMERGENCY ALERT 🚨\nA SafeSpace user needs urgent help!\nLocation: {maps_link}"
    emergency_number = "+27612028093"

    response = send_sms(emergency_number, message)

    if response:
        return jsonify({"status": "sent", "message": "Emergency alert delivered"})
    else:
        return jsonify({"status": "error", "message": "Failed to send emergency SMS"})

# --- USSD Backend ---
@app.route("/ussd", methods=['POST'])
def ussd_callback():
    session_id = request.values.get("sessionId", None)
    service_code = request.values.get("serviceCode", None)
    phone_number = request.values.get("phoneNumber", None)
    text = request.values.get("text", "")

    # Split user input into steps
    user_response = text.split("*")

    # Log the current user input
    print("📌 USSD Interaction")
    print(f"Session ID: {session_id}")
    print(f"Phone Number: {phone_number}")
    print(f"Full input so far: {user_response}")

    if text == "":  
        # First interaction - Language choice
        menu = "CON Welcome to SafeSpace\nChoose Language:\n1. English\n2. isiZulu\n3. Afrikaans"
    
    elif user_response[0] == "1":  
        # English selected
        if len(user_response) == 1:
            menu = "CON SAFE SPACE - GBV Reporting\n1. Report Incident\n2. Emergency Help Now\n3. Find Nearest Shelter\n4. Speak to Counsellor"
        elif user_response[1] == "1":
            if len(user_response) == 2:
                menu = "CON Please provide brief details of the incident:"
            else:
                incident = user_response[2]
                menu = f"END Thank you. Your report has been received: {incident}"
        elif user_response[1] == "2":
            menu = "END Emergency team will contact you immediately."
        elif user_response[1] == "3":
            menu = "END Nearest shelter details will be sent via SMS."
        elif user_response[1] == "4":
            menu = "END A counsellor will call you shortly."
        else:
            menu = "END Invalid choice."

    elif user_response[0] == "2":
        # isiZulu
        if len(user_response) == 1:
            menu = "CON SAFE SPACE - Ukubika Ubulili Obungenamandla (GBV)\n1. Bika Isigameko\n2. Usizo Oluphuthumayo Manje\n3. Thola Indawo Yokuhlala Esondele\n4. Khuluma Nomsizi"
        elif user_response[1] == "1":
            if len(user_response) == 2:
                menu = "CON Sicela unikeze imininingwane emfushane yesigameko:"
            else:
                incident = user_response[2]
                menu = f"END Siyabonga. Umbiko wakho wemukelwe: {incident}"
        elif user_response[1] == "2":
            menu = "END Ithimba eliphuthumayo lizokuthinta ngokushesha."
        elif user_response[1] == "3":
            menu = "END Imininingwane yendawo yokuhlala esondele izothunyelwa nge-SMS."
        elif user_response[1] == "4":
            menu = "END Umsizi uzokushayela maduze."
        else:
            menu = "END Ukukhetha okungavumelekile."
    
    elif user_response[0] == "3":  
        # Afrikaans
        if len(user_response) == 1:
            menu = "CON SAFE SPACE - GBV Meldingsdiens\n1. Meld 'n Voorval\n2. Noodhulp Nou\n3. Vind Naaste Skuiling\n4. Praat met 'n Raadgewer"
        elif user_response[1] == "1":
            if len(user_response) == 2:
                menu = "CON Verskaf asseblief 'n kort beskrywing van die voorval:"
            else:
                incident = user_response[2]  
                menu = f"END Dankie. Jou verslag is ontvang: {incident}"
        elif user_response[1] == "2":
            menu = "END Noodspan sal jou onmiddellik kontak."
        elif user_response[1] == "3":
            menu = "END Besonderhede van die naaste skuiling sal per SMS gestuur word."
        elif user_response[1] == "4":
            menu = "END 'n Raadgewer sal jou binnekort skakel."
        else:
            menu = "END Ongeldige keuse."
    
    else:
        menu = "END Invalid choice."

    return Response(menu, mimetype="text/plain")

# --- USSD Notifications Endpoint ---
@app.route("/ussd/notifications", methods=['POST'])
def ussd_notifications():
    session_id = request.values.get("sessionId", None)
    phone_number = request.values.get("phoneNumber", None)
    text = request.values.get("text", "")

    # Log session info + final user input
    print("📌 USSD Session Ended")
    print(f"Session ID: {session_id}")
    print(f"Phone Number: {phone_number}")
    print(f"Final User Input: {text}")

    return Response("Notification received", mimetype="text/plain")

# Run the app
if __name__ == "__main__":
    app.run(port=5000, debug=True)
