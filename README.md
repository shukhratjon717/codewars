console.log("FrontEnd JS ishga tushdi");
function itemTemplate(item) {
   return `<li
    class="list-group-item list-group-item-info d-flex align-items-center justify-content-between"
    >
    <span class="item-text">${item.reja}</span>
    <div>
        <button
             data-id="${item._id}" 
            class="edit-me btn btn-secondary btn-sm mr-1">
            O'zgartirish
        </button>
        <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">
            O'chirish
        </button>
    </div>
    </li>`
}


let createField = document.getElementById("create-field")

document
.getElementById("create-form")
.addEventListener("submit", function(e) {
    e.preventDefault();

    axios
    .post("/create-item", {reja: createField.value })
    .then((response) => {
        document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
        createField.value = "";
        createField.focus();
    } )
    .catch((err) => {
        console.log("Please, try again!")
    } )
});

document.addEventListener("click", function(e) {
// delete operation
    if(e.target.classList.contains("delete-me")) {
        alert("You pressed 'detele' button")
        if(confirm("Are you sure you want to delete?")){
            axios.post("/delete-item",{ id: e.target.getAttribute("data-id")})
            .then((response) => {
                console.log(response.data);
                e.target.parentElement.parentElement.remove();
            })
            .catch((err) => {
                console.log("Please, try again!");
            });
        }
        }
    


    // edit operation
    if(e.target.classList.contains("edit-me")){
       let userInput = prompt("Insert the change!",
       e.target.parentElement.parentElement
       .querySelector(".item-text").innerHTML);
       if(userInput) {
        axios.post("/edit-item", 
        {id: e.target.getAttribute("data-id"), 
        new_input: userInput,})
        .then((response) => {
            console.log(response)
            e.target.parentElement.parentElement
            .querySelector(".item-text")
            .innerHTML = userInput
        })
        .catch( (err) => {
            console.log("Please, try again!")
        });
       }
    };
});

document.getElementById("clean-all")
.addEventListener("click", function() {
    axios.post("/delete-all", {delete_all: true}).then((response) => {
        alert(response.data.state);
        document.location.reload();
    })
    .catch((err) => {

    })
})

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: async function (req, res) {
    const { title } = req.body;
    try {
      const todo = await User.create({ title }).fetch();
      return res.status(201).json(todo);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getUsers: async function (req, res) {
    try {
      const users = await Users.find();
      return res.status(users);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  update: async function (req, res) {
    const { id } = req.params;
    const { completed } = req.body;
    try {
      const todo = await User.updatOne({ id }).set({ completed });
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  delete: async function (req, res) {
    const { id } = req.params;
    try {
      const todo = await User.destroyOne({ id });
      return res.status(200).json(todo);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports.routes = {
  "/": { view: "pages/homepage" },
  "POST/user": "UserController.create",
  "GET/user": "UserController.getUsers",
  "PUT/user/:id": "UserController.update",
  "DELETE/user/:id": "UserController.delete",
};
