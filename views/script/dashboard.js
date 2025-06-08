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
const currUserElem = $.querySelector("#curr-user")

const chatHistoryUsers = [
  { _id: 0, username: "علی", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  { _id: 1, username: "مریم", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  { _id: 2, username: "رضا", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
]

let chatOnlineUsers

let currChatUserId = -1




initDashboard()


function chatOnlineItemTemplate(user) {
  return (`
    <li data-userid=${user.userId} class="user-item flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
      <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden me-1">
        <img
          class="w-full h-full object-cover"
          src=${user.imgSrc}
        />
      </div>
      <span>${user.username}</span>
    </li>
  `)
}

function chatOnlineViewHandler(newOnlineUsers) {
  // const chatOnlineUsers = [
  //   { _id: 0, username: "علی", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  //   { _id: 1, username: "مریم", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  //   { _id: 2, username: "رضا", imgSrc: "https://media.istockphoto.com/id/471926619/photo/moraine-lake-at-sunrise-banff-national-park-canada.jpg?s=612x612&w=0&k=20&c=mujiCtVk5QA697SD3d8V8BGmd91-8HlxCNHkolEA0Bo="},
  // ]

  chatOnlineUsers = newOnlineUsers

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


async function chatMessagesViewHandler() {
  const res = await fetch(`/chat-messages/${currChatUserId}`)
  const chatMessages = await res.json()

  let chatMessagesHTML = ''

  chatMessages.forEach(chatMessage => {
    chatMessagesHTML += chatMessageTemplate(chatMessage.userId != currChatUserId, chatMessage.content)
  })

  chatMessagesViewElem.textContent = ''

  chatMessagesViewElem.insertAdjacentHTML("beforeend", chatMessagesHTML)
}


function chatHistoryItemTemplate(user) {
  // return (`
  //   <li class="p-2 border rounded hover:bg-gray-100 cursor-pointer">${user.username}</li>
  // `)

  return (`
    <li data-userid=${user._id} data-username=${user.username} class="user-item flex items-center space-x-2 p-2 border rounded hover:bg-gray-100 cursor-pointer">
      <div class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden me-1">
        <img
          class="w-full h-full object-cover"
          src=${user.imgSrc}
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
    const data = JSON.parse(message)

    switch (data.action) {
      case "onlineUsers":
        chatOnlineViewHandler(data.data)
        break

      case "receivedMessage":
        receiveMessageHandler(data.data)
        break

      default:
        console.log("Undefined Command!, Received Message: ", data)
    }


    // console.log("Received Message:", JSON.parse(message))
  }

  ws.onerror = err => {
    console.log("Web Socket Err!", err)
  }

  ws.onclose = () => {
    console.log("Web Socket Closed!")
  }

  // setInterval(() => (ws.readyState == ws.OPEN)? ws.send("BUSI") : undefined, 500)

}


function receiveMessageHandler(data) {
  if (data.userId == currChatUserId) {

  } else {
    // show notife for user
    getNotificationPremission()
    showNotification(data.username, data.content)
  }
}

function showNotification(title, body) {
  // Check if notifications are supported.
  if (!("Notification" in window)) {
    console.log("This browser does not support system notifications.");
    return;
  }

  // If permission has already been granted, create a notification.
  if (Notification.permission === "granted") {
    new Notification(title, { body });
  }
  // If not, ask for permission and then display if granted.
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}

function setCurrChat(userId, username) {
  currChatTitleElem.textContent = username
  currChatUserId = userId
  chatMessagesViewHandler()
}


function getNotificationPremission() {
  // Check if the browser supports notifications.
  if ("Notification" in window) {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
      });
    }
  }
}

function getCurrUserInfo() {
  fetch("/user-session")
    .then(res => res.json())
    .then(userInfo => {
      currUserElem.textContent = userInfo.username
    })
}

function enableMessage() {
  sendMsgBtn.disabled = false
  inputMsgElem.disabled = false
}

function disableMessage() {
  sendMsgBtn.disabled = true
  inputMsgElem.disabled = true
}


function initDashboard() {
  getCurrUserInfo()
  chatOnlineViewHandler([])
  chatHistoryViewHandler()
  // chatMessagesViewHandler()
  disableMessage()

  chatOnlineListElem.addEventListener("click", event => {
    if (event.target.classList.contains("user-item")) {
      const userId = event.target.dataset.userid
      const username = event.target.dataset.username
    
      setCurrChat(userId, username)

      enableMessage()
    }
  })

  chatHistoryListElem.addEventListener("click", event => {
    if (event.target.classList.contains("user-item")) {
      const userId = event.target.dataset.userid
      const username = event.target.dataset.username
    
      setCurrChat(userId, username)

      disableMessage()

      chatOnlineUsers.some(user => {
        if (user.userId == userId) {
          enableMessage()
          return true
        }
      })
    }
  })

  sendMsgBtn.addEventListener("click", () => {
    if (currChatUserId != -1) {
      const content = inputMsgElem.value.trim()
      const message = {
        action: "sendMessage",
        data: {
          userId: currChatUserId,
          content,
        }
      }

      ws.send(JSON.stringify(message))
    }

    inputMsgElem.value = ''
  })

  initWebSocket()
}