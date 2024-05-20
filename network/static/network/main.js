document.addEventListener("DOMContentLoaded", () => {
  // add event listener for the createPostForm
  const createPostForm = document
    .querySelector("#createPostForm")
    .addEventListener("submit", create_post);


  // functions

  // create post function
  function create_post(event) {
    // get data from the form
    const postBody = document.querySelector("#createPostBody").value;

    // send POST request to the API
    fetch("/create_post", {
      method: "POST",
      body: JSON.stringify({
        body: postBody,
      }),
    })
      .then((response) => {
        // check response from the API
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error);
          });
        } else {
          return response.json();
        }
      })
      .then((result) => {
        // Print result
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error.message);
      });

    event.preventDefault();
  }
});
