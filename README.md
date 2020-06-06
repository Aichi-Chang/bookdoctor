### 🚩 Bookdoctor ###

Due to COVID and NHS found cut, our NHS has difficulties to cope with the current situation. There are too many patients and not enough staff to help them. Therefore I worked with other developers to create this online GP appointment booking system. 

The normal way of booking your GP appointment is to call your GP surgery. But as there are many people dialling to request COVID information, I think we should leave the phone line to those who actually need to ask questions and move the booking system online.

This appointment management system should come handy for both GP surgeries and their patients. So we've set up two login system for doctor and patient. Both roles will be able to book an appointment but only doctors can see the full patient list and write a medical history or prescribe medicines to their patients. when a patient logged in, they can check what medicine they've been prescribed, or any advice the doctor wants to give them.

The other part of the booking system is, patients never know when a doctor is available. They will have to check again and again over the phone to find out the exact time that suits them and the doctor they want to see. At bookdoctor, we display doctors' booked appointment calendar, so users will be able to see clearly which day is still available for bookings. 

We've also set up an email confirmation once an appointment is booked in our application's beta period. It might change in the future that rather than sending out an email to confirm, we will also send out an email or an SMS as a reminder 2 days before their appointments.


#### Visit the site here - [Bookdoctor](https://bookdoctor.herokuapp.com/)


### Preview
![ezgif com-video-to-gif](https://media.giphy.com/media/RM5wellDBMBzW6ITEC/giphy.gif)




### 💎features ###
* Set the default in the backend, user cannot choose the role while registering. The default role is ‘patient’. Doctors are registered as seeds in the database.

* When an appointment is created, an appointment object will be created in the appointment collection in the database and be pushed to both doctor's and patient's appointment array. It also worked when deleting an appointment, the specific appointment object will be removed from these three collections.

* How to know if the doctor you want to see is available? By selecting a doctor from the drop-down list at the booking page, you will be able to see the doctor's booked appointments display in the calendar.

* Similar rules apply to patients' medical history column, the small differences are that history will be able to write(create) by a doctor, and it will only be created in the history collection and be pushed to patient's history array. 

* User dashboard shows all booked appointments and medical histories. User will also be able to delete their appointment if needed.

* The confirmation email system will send out an email to confirm your appointment once booked.


### :rocket: Get Started Locally ###

* Clone or download the repo
* `npm install` to install all the dependencies
* `mongod --dbpath ~/data/db`  or `mongod` (if you Mac is majovee version)
* `npm run seed`
* `npm run serve:back` to run backend
* `npm run serve:front` to run frontend



### 🕹 Technologies used ###

#### Backend:
* Express
* NodeJS
* MongoDB Atlas
* Mongoose
* JWT
* SendGrid
* NHS Corona Virus API

#### Frontend & UI:
* JavaScript
* React
* SASS & CSS
* MaterialUI
* Bulma

#### Version Control: 
* Git 
* GitHub

* Insomnia (API test)
* Heroku (cloud platform for deployment)
* Babel (JavaScript transcompiler)
* Webpack (JavaScript module bundler)




### ✔️ Approach Taken ###



#### Project Plan



#### Back end


#### Front end



### 🤗 Wins ###



### 🧐 Chanllenges ###




### 🔮 Potential future features ###








