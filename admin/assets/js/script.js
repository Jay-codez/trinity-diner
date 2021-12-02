const refreshSection = (id) => {
    $(document).ready(() => {
        $(`#${id}`).load(window.location.href + ` #${id}>*`, "");
    });
};

const rejectOrder = (itemId) => {
    $.get(`/remove/${itemId}`, (data, res) => {

        if (res) {
            refreshSection("order-status")
        }

    })

}

const button = document.querySelector('input');
const fieldset = document.querySelector('fieldset');

button.addEventListener('click', disableButton);

function disableButton() {
    fieldset.disabled = true;
    window.setTimeout(function() {
        fieldset.disabled = false;
    }, 99999999);
}


$("#order-status").on("click", ".reject-order", function(e) {
    e.preventDefault();
    let rejItemId = $(this).attr("rejItemId")

    rejectOrder(rejItemId)
});