function onFormSubmit(e) {
    var responses = e.namedValues;

    // Update this URL once your backend is deployed
    var url = "https://your-backend-api.com/webhook/google-form";
    var secret = "super-secret-key";

    var payload = {
        fullName: responses["Name Surname"] ? responses["Name Surname"][0] : "",
        iin: responses["ИИН(ЖСН)"] ? responses["ИИН(ЖСН)"][0] : "",
        email: responses["Email"] ? responses["Email"][0] : "",
        phone: responses["Phone Number"] ? responses["Phone Number"][0] : "",
        birthDate: responses["BirthDate"] ? responses["BirthDate"][0] : "",
        graduatedSchool: responses["Graduated School"] ? responses["Graduated School"][0] : "",
        totalExperience: responses["Total Teaching Experience (years)"] ? responses["Total Teaching Experience (years)"][0] : 0,
        currentWorkplace: responses["Current Place of Work"] ? responses["Current Place of Work"][0] : "",
        experienceInCurrent: responses["Teaching Experience at Current School (years)"] ? responses["Teaching Experience at Current School (years)"][0] : 0,
        subject: responses["Subject Taught"] ? responses["Subject Taught"][0] : "",
        category: responses["Qualification Category"] ? responses["Qualification Category"][0] : "",
        categoryExpiration: responses["Category Valid Until"] ? responses["Category Valid Until"][0] : "",
        isHomeroomTeacher: responses["Class Teacher (Homeroom Teacher)"] ? responses["Class Teacher (Homeroom Teacher)"][0] : "Жоқ",
        homeroomClass: responses["If yes, indicate the class"] ? responses["If yes, indicate the class"][0] : "",
        academicBackground: responses["Academic Background"] ? responses["Academic Background"][0] : "",
        tat2024: responses["TAT Results – 2024(percent)"] ? responses["TAT Results – 2024(percent)"][0] : "",
        tat2025: responses["TAT Results – 2025(percent)"] ? responses["TAT Results – 2025(percent)"][0] : "",
        tat2026: responses["TAT Results – 2026(percent)"] ? responses["TAT Results – 2026(percent)"][0] : "",
        ielts: responses["IELTS (Score and year)"] ? responses["IELTS (Score and year)"][0] : "",
        toefl: responses["TOEFL (Score and year)"] ? responses["TOEFL (Score and year)"][0] : "",
        tesol: responses["TESOL (Yes / No + year)"] ? responses["TESOL (Yes / No + year)"][0] : "",
        celta: responses["CELTA (Yes / No + year)"] ? responses["CELTA (Yes / No + year)"][0] : "",
        ib: responses["IB Certificate (Yes / No + year)"] ? responses["IB Certificate (Yes / No + year)"][0] : "",
        ap: responses["AP Certificate (Yes / No + year)"] ? responses["AP Certificate (Yes / No + year)"][0] : "",
        btsResults: responses["BTS Results"] ? responses["BTS Results"][0] : "",
        kboResults: responses["KBO Results"] ? responses["KBO Results"][0] : "",
        regionalResults: responses["Regional (Oblast) Competition Results"] ? responses["Regional (Oblast) Competition Results"][0] : "",
        labResults: responses["Laboratory Work Results (for relevant subjects only)"] ? responses["Laboratory Work Results (for relevant subjects only)"][0] : ""
    };

    var options = {
        method: "post",
        contentType: "application/json",
        headers: {
            "x-webhook-secret": secret
        },
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());
}
