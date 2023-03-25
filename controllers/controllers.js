const homepage = (req, res) => {
    res.render("login.html");
}

const login = (req, res) => {
    window.addEventListener("DOMContentLoaded", () => {
        const firebaseConfig = {
            apiKey: "AIzaSyCRBlBSaOotcyp2ogXhNcbeiFQC74FGDmA",
            authDomain: "adminsite-e9b68.firebaseapp.com",
            databaseURL: "https://adminsite-e9b68-default-rtdb.firebaseio.com",
            projectId: "adminsite-e9b68",
            storageBucket: "adminsite-e9b68.appspot.com",
            messagingSenderId: "448337078221",
            appId: "1:448337078221:web:3ac9c8c711a947b8468684"
        };

        firebase.initializeApp(firebaseConfig);

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        document
            .getElementById("login")
            .addEventListener("submit", (event) => {
                event.preventDefault();
                const load = document.querySelector('.add').classList.add('cyrcle');
                const error = document.querySelector('.err');
                document.querySelector('.button').classList.add('buttonEN')
                const login = event.target.login.value;
                const password = event.target.password.value;


                // AUTHENTICATION CONNECTION -->
                firebase
                    .auth()
                    .signInWithEmailAndPassword(login, password).catch(function (e) {
                        error.innerHTML = 'invalid password';
                        document.querySelector('.button').classList.remove('buttonEN')
                        const load = document.querySelector('.add').classList.remove('cyrcle');
                        const passIput = document.querySelector('.pass').classList.add('passInput');
                    })
                    .then(({ user }) => {
                        return user.getIdToken().then((idToken) => {
                            return fetch("/sessionLogin", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                                },
                                body: JSON.stringify({ idToken }),
                            });
                        });
                        user.console.error();
                    })
                    .then(() => {
                        window.location.assign("/profile");
                    });
            });
    });

}



module.exports = {login};