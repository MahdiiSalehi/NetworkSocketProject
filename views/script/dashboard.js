// In the name of ALLAH!
// Mahdi Salehi

const $ = document
const ws = new WebSocket(`ws://${window.location.host}`);

const chatOnlineListElem = $.querySelector("#chat-online-list")
const currChatTitleElem = $.querySelector("#curr-chat-title")
const chatMessagesViewElem = $.querySelector("#chat-view")
const chatHistoryListElem = $.querySelector("#chat-history-list")
const sendMsgBtn = $.querySelector("#send-msg-btn")
const inputMsgElem = $.querySelector("#input-msg")

const chatHistoryUsers = [
  { _id: 0, username: "علی", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  { _id: 1, username: "مریم", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  { _id: 2, username: "رضا", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
]
const currChatUser = -1




initDashboard()


function chatOnlineItemTemplate(user) {
  return (`
    <li data-userid=${user._id} class="user-item flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
      <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden me-1">
        <img
          class="w-full h-full object-cover"
          src=${user.imgSrc}
          alt="Sample Image"
        />
      </div>
      <span>${user.username}</span>
    </li>
  `)
}

function chatOnlineViewHandler() {
  const chatOnlineUsers = [
    { _id: 0, username: "علی", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
    { _id: 1, username: "مریم", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
    { _id: 2, username: "رضا", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  ]

  let chatOnlineHTML = ''

  chatOnlineUsers.forEach(user => {
    chatOnlineHTML += chatOnlineItemTemplate(user)
  })

  chatOnlineListElem.textContent = ''

  chatOnlineListElem.insertAdjacentHTML("beforeend", chatOnlineHTML)
}


function chatMessageTemplate(isMyMessage, message) {
  let template

  if (isMyMessage) {
    template = `
      <div class="flex items-start">
        <div class="bg-blue-100 text-blue-900 p-2 rounded-lg max-w-xs">
          ${message}
        </div>
      </div>
    `
  } else {
    template = `
      <div class="flex items-end justify-end">
        <div class="bg-green-100 text-green-900 p-2 rounded-lg max-w-xs">
          ${message}
        </div>
      </div>
    `
  }

  return template
}


function chatMessagesViewHandler() {
  const chatMessages = [
    { _id: 0, content: "سلام، چطوری؟" },
    { _id: 1, content: "خوبم، ممنون!" },
    { _id: 1, content: "تو چطوری؟!" },
  ]

  let chatMessagesHTML = ''

  chatMessages.forEach(chatMessage => {
    chatMessagesHTML += chatMessageTemplate(chatMessage._id, chatMessage.content)
  })

  chatMessagesViewElem.textContent = ''

  chatMessagesViewElem.insertAdjacentHTML("beforeend", chatMessagesHTML)
}


function chatHistoryItemTemplate(user) {
  // return (`
  //   <li class="p-2 border rounded hover:bg-gray-100 cursor-pointer">${user.username}</li>
  // `)

  return (`
    <li data-userid=${user._id} class="user-item flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
      <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden me-1">
        <img
          class="w-full h-full object-cover"
          src=${user.imgSrc}
          alt="Sample Image"
        />
      </div>
      <span>${user.username}</span>
    </li>
  `)
}

function chatHistoryViewHandler() {
  let chatHistoryHTML = ''

  chatHistoryUsers.forEach(user => {
    chatHistoryHTML += chatHistoryItemTemplate(user)
  })

  chatHistoryListElem.textContent = ''

  chatHistoryListElem.insertAdjacentHTML("beforeend", chatHistoryHTML)
}


function initWebSocket() {
  ws.onopen = () => {
    console.log("Web Socket Connected!")
  }

  ws.onmessage = event => {
    const message = event.data

    console.log("Received Message:", message)
  }

  ws.onerror = err => {
    console.log("Web Socket Err!", err)
  }

  ws.onclose = () => {
    console.log("Web Socket Closed!")
  }

  // setInterval(() => (ws.readyState == ws.OPEN)? ws.send("BUSI") : undefined, 500)

}


function getOnlineUsers() {
  
}


function initDashboard() {
  chatOnlineViewHandler()
  chatHistoryViewHandler()
  chatMessagesViewHandler()

  chatOnlineListElem.addEventListener("click", event => {
    if (event.target.classList.contains("user-item")) {
      const userId = event.target.dataset.userid
      console.log(userId)
    }
  })

  chatHistoryListElem.addEventListener("click", event => {
    if (event.target.classList.contains("user-item")) {
      const userId = event.target.dataset.userid
      console.log(userId)
    }
  })

  sendMsgBtn.addEventListener("click", () => {
    console.log(inputMsgElem.value.trim())
    inputMsgElem.value = ''
  })

  initWebSocket()
}