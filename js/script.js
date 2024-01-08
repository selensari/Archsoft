document.getElementById("loginButton").addEventListener("click", function () {
  alert("Giriş Yap butonuna tıklandı!");
});

document
  .getElementById("registerButton")
  .addEventListener("click", function () {
    alert("Kayıt Ol butonuna tıklandı!");
  });

function submitLoginForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginData = {
    email: email,
    password: password,
  };

  fetch("https://localhost:7069/api/Logins/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP hata, durum: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Giriş başarılı!");
      // Giriş başarılıysa yönlendirilecek sayfayı belirtin (örneğin, dashboard.html)
      window.location.href = "PoolStatement.html";
    })
    .catch((error) => {
      console.error(error.message); // Hata mesajını konsola yazdırın
      alert("Giriş başarısız!");
    });
}
// const email = document.getElementById("email").value;
// const password = document.getElementById("password").value;

// const submitLoginForm = async () => {
//     const response = await fetch("https://localhost:7069/api/Logins/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             // Diğer isteğe özel başlıkları burada ekleyebilirsiniz
//         },
//         body: JSON.stringify({
//             email: "YAKIŞIKLI",
//             password: "3131"
//         }),
//     });
//     const responseJson = await response.json();
//     if (!response.ok) {
//         console.log("Login failed", response);
//         alert("Giriş başarısız!");
//         return response;
//     }
//     console.log(response, responseJson, "response");
//     alert("Giriş başarılı!");
//     console.log("Login successful");
//     return responseJson;

// };

function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Şifre tekrarı kontrolü
  if (password !== confirmPassword) {
    alert("Şifreler uyuşmuyor!");
    return;
  }

  const registrationData = {
    username: username,
    email: email,
    password: password,
  };

  fetch("https://localhost:7069/api/Logins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(registrationData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP hata, durum: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      alert("Kayıt başarılı!");
      // Kayıt başarılıysa yönlendirilecek sayfayı belirtin (örneğin, login.html)
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error(error.message); // Hata mesajını konsola yazdırın
      alert("Kayıt başarısız!");
    });
}

var selectedEvent; // Seçilen etkinlik adını saklamak için
var votedDates = []; // Kullanıcının oy verdiği tarihleri saklamak için

// Önceki sayfadan gelen etkinlik bilgisini al
// Bu bilgi, önceki sayfada bir butona tıklandığında veya başka bir yöntemle bu sayfaya gelindiğinde alınabilir
// Bu örnekte elle bir etkinlik adı atandı, gerçek bir senaryoda bu bilgiyi bir URL parametresinden alabilirsiniz
selectedEvent = "DogusApp";

// Bu etkinlik adını sayfada göster
document.getElementById("selected-event").innerHTML =
  "Seçilen Etkinlik: " + selectedEvent;

function submitMeetingDate() {
  var selectedDate = document.getElementById("meetingDate").value;
  document.getElementById("selected-date").innerHTML =
    "Seçilen Tarih: " + selectedDate;
}

function voteForDate() {
  if (!selectedDate) {
    alert("Lütfen önce bir tarih seçin.");
    return;
  }

  // Simülasyon amaçlı, gerçek bir sunucu kullanmanız gerekecek
  // Her oy verildiğinde, oy verilen tarih votedDates dizisine eklenir
  votedDates.push(selectedDate);

  document.getElementById("voted-dates").innerHTML =
    "Oy Verilen Tarihler: " + votedDates.join(", ");
}

function showEventDescription() {
  var eventName = $("#eventName").val();

  // Eğer daha fazla etkinlik varsa, bu kısmı güncelleyin.
  var eventDescriptions = {
    AppData:
      "<strong>Takım Hakkında:</strong><br>AppData, Doğuş Üniversitesi'nde kurulan bir takımdır ve yazılım işleriyle ilgilenmektedir. Güncel projemiz olan DogusApp, okulumuzun mobil uygulamasıdır.",
    ArchSoft:
      "<strong>Takım Hakkında:</strong><br>Archsoft, takım çalışması için geliştirilmiş bir web uygulamasıdır. Archsoft ile takım üyelerinizle kolayca iletişim kurabilir, görevleri paylaşabilir, takvimleri senkronize edebilir ve projelerinizi başarıyla tamamlayabilirsiniz. Takım üyelerinizin uygun olduğu zamanları belirleyerek toplantılar planlayabilir, anketler oluşturabilir ve sonuçları görebilirsiniz. Ayrıca, takım çalışmasını daha eğlenceli ve etkili hale getirir.",
  };

  var selectedEventDescription = eventDescriptions[eventName];

  // Etkinlik açıklamasını göster
  $("#eventDescription").html(selectedEventDescription);

  // Seçilen etkinlik form gruplarını göster
  if (eventName === "ArchSoft") {
    $("#archSoftInfo").show();
    $("#appDataInfo").hide();
  } else if (eventName === "AppData") {
    $("#appDataInfo").show();
    $("#archSoftInfo").hide();
  }
}

function goToSelectedEvent(eventName) {
  // Seçilen etkinliğe göre ilgili sayfaya yönlendir
  window.location.href = eventName + "Info.html";
}

var selectedEvent = "ArchSoft";
var votedDates = [];

document.getElementById("selected-event").innerHTML =
  "Seçilen Etkinlik: " + selectedEvent;

function submitMeetingDate() {
  var selectedDate = document.getElementById("meetingDate").value;
  var selectedTime = document.getElementById("meetingTime").value;
  document.getElementById("selected-date").innerHTML =
    "Seçilen Tarih ve Saat: " + selectedDate + " " + selectedTime;
}

function voteForDate() {
  var selectedDate = document.getElementById("meetingDate").value;
  if (!selectedDate) {
    alert("Lütfen önce bir tarih seçin.");
    return;
  }

  if (votedDates.includes(selectedDate)) {
    alert("Bu tarihe zaten oy verdiniz.");
    return;
  }

  votedDates.push(selectedDate);

  document.getElementById("voted-dates").innerHTML =
    "Oy Verilen Tarihler: " + votedDates.join(", ");
}

var selectedEvent = "AppData";
var votedDates = [];

document.getElementById("selected-event").innerHTML =
  "Seçilen Etkinlik: " + selectedEvent;

function submitMeetingDate() {
  var selectedDate = document.getElementById("meetingDate").value;
  var selectedTime = document.getElementById("meetingTime").value;
  document.getElementById("selected-date").innerHTML =
    "Seçilen Tarih ve Saat: " + selectedDate + " " + selectedTime;
}

function voteForDate() {
  var selectedDate = document.getElementById("meetingDate").value;
  if (!selectedDate) {
    alert("Lütfen önce bir tarih seçin.");
    return;
  }

  if (votedDates.includes(selectedDate)) {
    alert("Bu tarihe zaten oy verdiniz.");
    return;
  }

  votedDates.push(selectedDate);

  document.getElementById("voted-dates").innerHTML =
    "Oy Verilen Tarihler: " + votedDates.join(", ");
}

function redirectToIndex() {
  window.location.href = "index.html";
}
const signInBtnLink = document.querySelector(".signInBtn-link");
const signUpBtnLink = document.querySelector(".signUpBtn-link");
const wrapper = document.querySelector(".wrapper");
signUpBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});
signInBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});
