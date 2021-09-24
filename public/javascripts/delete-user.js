
let body = document.body;
document.querySelector(".deleteAccount").addEventListener("click", (e) => {confirmDelete(e)})

 confirmDelete = (e) => {
    let container = document.createElement("div");
    let warning = document.createElement("h2");
    let warningPt2 = document.createElement("h2");
    let passwordBox = document.createElement("input");
    let submitButton = document.createElement("button");

    container.setAttribute("class", "container");
    passwordBox.setAttribute("type", "password");
    passwordBox.setAttribute("autocomplete", "new-password");
    warning.innerText = "Are you sure you want to delete your Account? You will lose access to all your posts and recent comments";
    warningPt2.innerText = "Enter your password to confirm";
    submitButton.innerText = "Confirm Delete My Account"
    submitButton.addEventListener("click", async (e) => {verifyPassword(e)})
    passwordBox.addEventListener("keydown", (e)=> {if (e.key === "Enter"){}})

    verifyPassword = async (e) => {
        let userId;
        try {
            let response = await fetch('/users/userid');
            userId = await response.json();
            userId = userId.userId;
            if (!userId){throw new Error("not logged in")}
            let body = {password: passwordBox.value};
            const res = await fetch(`/users/${userId}`, {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            let {error, message} = await res.json();
            if (error){
                let ele = document.querySelector(".deleteError");
                if (ele){ele.remove()}
                let errorBox = document.createElement("div");
                let errorList = document.createElement("ul");
                let errorEle = document.createElement("li");
                errorEle.setAttribute("class", "deleteError")
                errorEle.innerText = error;
                errorList.append(errorEle);
                errorBox.append(errorList);
                container.append(errorBox);
            }else if (message){
                window.location.replace("/");
            }
        } catch (error) {
            return error
        }



    }
    container.append(warning, warningPt2, passwordBox, submitButton);
    let changeDataForm = document.querySelector(".mainContent");
    changeDataForm.parentNode.replaceChild(container, changeDataForm)
}
