module.exports = function (api) {

    var options = api.options.email;
    var server = require("emailjs").server.connect(options);

    this.sendPasswordReset = function (user, callback) {

        var title = api.options.render.locals.site.title;
        var link = api.options.render.locals.site.url + "/reset-password?ticket=" + user.ticket;

        function composePasswordReset() {
            var text = "Dear Member,\n" +
                "This email was sent automatically by " + title + " in response to your request to reset your password.\n" +
                "This is done for your protection; only you, the recipient of this email can take the next step in the password recovery process.\n" +
                "To reset your password and access your account, copy and paste the following link (expires in 24 hours) into the address bar of your browser:\n" +
                link +
                "\nThank you,\n" +
                "" + title + " Team";
            return  text;
        }

        function composePasswordResetHtml() {
            var text = "<html><body>" +
                "Dear Member,<br>" +
                "This email was sent automatically by " + title + " in response to your request to reset your password.<br>" +
                "This is done for your protection; only you, the recipient of this email can take the next step in the password recovery process.<br>" +
                "To reset your password and access your account, either click on the button or copy and paste the following link (expires in 24 hours) into the address bar of your browser:<br>" +
                "<a href=\"" + link + "\">" + link + "</a><br><br>" +
                "Thank you,<br>" +
                "" + title + " Team";
            return  text;
        }

        server.send({
            from: options.sender,
            to: user.email,
            subject: "Password Reset Request",
            text: composePasswordReset(),
            attachment: {data: composePasswordResetHtml(), alternative: true}
        }, callback);
    };

};