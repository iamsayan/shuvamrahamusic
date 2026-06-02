"use client";

import { BadgeCheck, Star } from "lucide-react";

// ============================================================================
// REVIEW DATA
// ============================================================================
const allReviews = [
  {
    author: "Sayan Datta",
    rating: 5,
    date: "2 years ago",
    review: "Very Good Setup and equipped with modern gears.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocKMR5Gt7iecEqq918vUoOuar16EEpr0pjzMkDMsiyRmJSQXBW1U=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Sayantan Saha",
    rating: 5,
    date: "a year ago",
    review:
      "An awesome, great, friendly teacher who can transform you completely (trust me). From guiding me flawlessly to pushing my limits, Shuvam sir has helped me a lot. He is a fun, entertaining and interactive teacher to communicate with. Glad to be his student :)",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVtOwE_LhJW5UojUp140dQ9lnBMR8Z9QpNInm6UKDfiOnm2i5a8=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThank you for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Soumin Debnath 1386",
    rating: 5,
    date: "a year ago",
    review:
      "I’ve been studying with Shuvam sir on and off for 6months and can say i’m quite pleased with what he brings to the table as a teacher.Patient and knowledgeable, he has knack for breaking down complex concepts into understandable terms. He …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVTetWBp_-jwNs4RQvGF045Rt0CWJ2f6jTSgduIBEh4PhIZnglo2w=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "arunima singh",
    rating: 5,
    date: "a year ago",
    review:
      "Awesome Artist....My son is taking classes from Shuvam and we are satisfied with the kind of improvement we can see in my son is really good within a few months. I would really recommend all you pupils who are seriously looking for a guitar teacher, to join and enjoy the journey of Music with guitar.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVtMc9XNXFRDP2laR7z6CCG8_UiPSOTN8JszfmmapkUtLoFU-kSYQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Arpita Das",
    rating: 5,
    date: "2 years ago",
    review:
      "Have been there for my son. Soothing musical experience, apt ambience for music lovers. Shuvam possesses excellent skills and treats his students well. Would highly recommend people looking for a guitar session to check out this place.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIFJ5wEtBF6ROljmjkhBZq_jQWuDpOVkGsJmDHPwz5PKZtPAQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Tuhina Banerjee",
    rating: 5,
    date: "a year ago",
    review:
      "I've been taking lessons with him for last three months. I'm glad I found a teacher as patient, friendly and knowledgable as Shuvam Da. He always encourages me to push my abilities",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVkVS4_UiTYixGrJP4RfAmRfLM--lGlRzwWDztst0fRPEcQrAEX=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Muskan Saraf",
    rating: 5,
    date: "4 years ago",
    review:
      "Shuvam is a great guitar player and teacher. I never played guitar before prior to my lesson with him. His teaching method allows you to learn the guitar quickly and effectively. He is outgoing/friendly and his lessons are really enjoyable. Also, his guitar knowledge is amazing!",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJ3MLSp8gbSJCJ_u-mLVgjnT7AI8JON9WDkWl0_AO5p90CGAQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 4 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Jay Sharma",
    rating: 5,
    date: "2 years ago",
    review:
      "SRM Recording Studio in Kolkata is a haven for artists. With state-of-the-art equipment and an inviting atmosphere, it sets the bar high. Shuvam Raha's expertise as a musician with depth, coupled with his sound engineering skills, adds a …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVNlZIdOxNLGr14jpHDvugQiQRPK8PO4Bgmr5uJtwhQSA3PMmKMPw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Niladri Banerjee",
    rating: 5,
    date: "2 years ago",
    review:
      "A good place for all your studio works, if you are a musician or a dubbing artist, this is the place you can trust. Shuvam Raha himself being a musician adds value to the whole package. …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWD6QEZ8AKuNfq71wre7oBfiIiQWVehEm8wQBzblwrv44zpoblXPQ=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "samarpan saha",
    rating: 5,
    date: "a year ago",
    review:
      "A wonderful musician and music teacher for beginner to pro level. Has great knowledge over music theory and his instruments. And a wonderful human being too!",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIaDl8pm3EsTxvg0eJA-4uEuWgZ2tJfeAkZAZwuZj9l2l-IqA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Riya's World",
    rating: 5,
    date: "5 years ago",
    review:
      "Easy to learn guitar with shuvam Raha sir..\nA great teacher who teaches guitar  very carefully  and giving his time to all of his students.. He has outstanding skills and experience. No doubt he is an excellent teacher.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUZRLWL_896vncQqiZxx1kYWFVwb-UsGZRrh-AAkGC0VxSOzIBC=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words .",
    sentiment: "positive",
  },
  {
    author: "Swetasree Ghosh Roy",
    rating: 5,
    date: "5 years ago",
    review:
      "Very good teacher. He is very dedicated to what he is doing. At the same time, knows how to work with kids. In a month, he was able to impress my 10yrs old girls and create her interest for music. Very well behaved.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXw5Vj6eQpg_qkS6PgaP46JZdbdWTtGrKeZ0iJujOEprIbPZ7DR=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks a lot mam. Thanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Subhankar Karmakar",
    rating: 5,
    date: "5 years ago",
    review:
      "He is very humble, polite and cooperative. One of the best professional musician I have ever noticed. His music skill especially with guitar is extraordinary. His X Factor is his vocal sound and it sounds very much soothing, unique and …",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocLGaTPR00YuzBhNPeFWPaU5DxdFTX0ARUsatSSSNIHc8HuN1A=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words. ☺️",
    sentiment: "positive",
  },
  {
    author: "AC",
    rating: 5,
    date: "4 years ago",
    review:
      "He is a very friendly guitar teacher. I have had no problems in communicating with him. He teaches quite well too and right from the basics which was a blessing for a person like me who is new to this instrument.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXGnXPVz1dMgPImVDqtzhKYfqgKQbmRf8mD5BbvCVVjK2Rtgo1wXg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 4 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Medhasree Ghosh",
    rating: 5,
    date: "4 years ago",
    review:
      "Amazing teacher to be honest. He's been teaching me for a while now and I have had great experience, even though am learning from him online it doesn't seem to be that hard and he's not strict towards me even though I mess up A LOT, he …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV7ipxOfj9seg2KJIH7rUFw6uUzmBvdtfx7R1xzBwQveSNFYjh7=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 4 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "swagata das",
    rating: 5,
    date: "5 years ago",
    review:
      "One of the best teachers in Kolkata. Experienced teacher with good communication skill and friendly towards his students. He makes learning easy.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocLFHWiZ7O2e-diVr7sjr2i3r2Huhe2hMYHRL_KKsh-1zyDtFmY=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "sharmila som",
    rating: 5,
    date: "3 years ago",
    review:
      "Shuvam is a very good teacher.He is very friendly with his students.Very polite and positive in neture.God bless him.Our beast wishes always with him.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUSrs8CBqRmp2hI1CMVbbL4WmAGfT-PisDrlPwNDxJxe1Fr7HE=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Arpan Bose",
    rating: 5,
    date: "6 years ago",
    review:
      "I've been learning for a month, and so far the friendliness and ease of access has been an absolute blast to experience. Shubham Sir is easy going and as frank as anyone can get, and besides being an amazing guitarist, hes also a joy to learn with.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVZYOqv70UlIfq0x76XTQzzVZ_497cXXuKriu-V7wh-XXMvGLSPEQ=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "ANURAG Lilha",
    rating: 5,
    date: "5 years ago",
    review:
      "Its been 2 months since i started learning spanish guitar with shuvam sir and he has already taught me so many things he is surely the most genuine guitar teacher you can ever find.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocImzm5SV3sktcVRyJVdrhycv2G_jiN21kDKW8qHBLs5yGU3-A=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Somik Das",
    rating: 5,
    date: "3 years ago",
    review:
      "I have been learning from Shuvam from quite sometime now and he has got avid experience in producing music.. I hope to learn music production from him sometime soon.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWYoCgBbIbOeAUuEFv-mz9R-a03PrkL911gcS6P05b-1v2f0t6I5Q=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur kind words ☺️",
    sentiment: "positive",
  },
  {
    author: "Narendra",
    rating: 5,
    date: "a year ago",
    review:
      "I have recently joined Shuvam’s guitar classes. He is great with his skills and I’m enjoying learning.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVtqCl0v6v0PA4KSJIVpvfwWDgWo_yaLawuztdcjv-TqdojgFgV=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Manisha Adhikari",
    rating: 5,
    date: "6 years ago",
    review:
      "Started learning here from December & my learning experience with him is very good.. as a teacher he is too good & any one can learn from him very quickly becz he perfectly explain every doubts... and he is a cool teacher also....",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXfJDDz-muTaoIVK_GeLdlUCFntWNwGiS5uA_3aaOCVtEGaul9C=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 6 years ago\nThanks",
    sentiment: "positive",
  },
  {
    author: "ARIJIT CHOWDHURY",
    rating: 5,
    date: "2 years ago",
    review:
      "Ambiance is amazing and the setup is outstanding. Prices are reasonable too. You need to come and see it for yourself and be rest assured you will get your money’s worth.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVvdp1tiBNpVZob7KvpcdATqa3Okaj5z8kj5AzS4lyF3dsQVBQuGA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Ranit Das",
    rating: 5,
    date: "2 years ago",
    review:
      "You can get a nice homely studio at reasonable price.. and mainly a professional sound engineer. Check out the studio and get a satisfactory result with your new projects",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV4lgTZ2eEiyRFOzjD04VUHb8lKLDXpa3v5baYUm53CdQIDCG5U6Q=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Anwesha Mukherjee",
    rating: 5,
    date: "7 years ago",
    review:
      "I was looking for a guitar teacher from long time but didn't find anybody whose teaching skills could motivate me until I met Mr shubam Raha..his unique way of teaching and his student friendly attitude helped me to learn Guitar in the …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWBHBFhSOyIRZbEeON_cdp3WqwMGRoJfajZN8oOGRrR6ofVxPhq=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 7 years ago\nThank you for the kind words ..",
    sentiment: "positive",
  },
  {
    author: "Subho Das",
    rating: 5,
    date: "2 years ago",
    review:
      "Absolutely top-notch music studio!\nRich equipment and a professional operator make this place a musician's dream come true.  Highly recommended!",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW95_f-qDYxE0hpS5vpjB5Tz1JPOOlMLbW2DeCvlS5FzmtGIFVN=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Riddho Bhattacharyya",
    rating: 5,
    date: "6 years ago",
    review:
      "Ypou don't go to this place Just to play guitar.....the teaching is phenomenal...and unlike other teachers sir is really open towards songs (rock and metal)or any other genre...the teaching portion is completely rewarding and …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUR11vzKeeVZ_4Dwao3grcIGHkJn0OHHIyOHeYDtvUATzzf_Bmp=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Mallika sarkar",
    rating: 5,
    date: "5 years ago",
    review:
      "As a guitarist he is highly skilled. Very polite with students. My son learns from him and I am very happy.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWYUrfZIGO8TmT3NgQTUKcrou9l1lLeDV2dRbVb6gkP1r72KJBbhQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words mam. 😊 …",
    sentiment: "positive",
  },
  {
    author: "Barenya Chatterjee",
    rating: 5,
    date: "7 years ago",
    review:
      "Shuvam posses perfect balance of knowledge and skill ... not only as a performative musician but also he is a great student friendly music teacher too .. he \\°/ rocks :)",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUxDAwZeLmeb8zKxY13ID_62Haw-Z_UAC6KDAGxXzeaIQ-piUkD=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 7 years ago\nThanks buddy. Thanks a lot for ur valuable comments.",
    sentiment: "positive",
  },
  {
    author: "Dr. Suman Meyur",
    rating: 5,
    date: "3 years ago",
    review:
      "If you are really into music and learn serious guitar, this is the best place you can find your tune. Best guitar classes in kolkata.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUgX8AxrciQplMEyiX8o6yTqSRSPXKkeXZXQ3_I1u5QqzN502UT=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur feedback.. ☺️",
    sentiment: "positive",
  },
  {
    author: "kishore kumar",
    rating: 5,
    date: "7 years ago",
    review:
      "Perfect for all level players...\nConvienient timings as per ur routine\nWell experienced teacher...\nMy overall experience was really enthusiastic",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUc-RwFpGzBdG01t16qKJpHVnY1-tGwWHhnS3znQ__UqPlyVw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 7 years ago\nThanks for ur valuable comment.",
    sentiment: "positive",
  },
  {
    author: "Ranit Roy",
    rating: 5,
    date: "6 years ago",
    review:
      "Very good and knowledgeable teacher. The way he explain the basics is really very good and easy to understand for everyone including begginers and amateurs.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXOk3qDvvff8gDwHVp0zFfp_vnYR7g0mPdMngQUJ-Rnll2f6PN8=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 6 years ago\nThanks",
    sentiment: "positive",
  },
  {
    author: "Saikat Manna",
    rating: 5,
    date: "6 years ago",
    review:
      "He doesn't only teach you how to play Guitar but also gives you and inside look to the music theory and basics of arranging a track I really learned a lot from him in a short span of time. Really thanks a lot to you sir",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUZjNv10EEeQ2HmnIsSdz1L1YXxreuBMjwdoV8ung8CMoJIRaGH=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for sharing your experience, Saikat.",
    sentiment: "positive",
  },
  {
    author: "Mr. Mitter",
    rating: 5,
    date: "2 years ago",
    review:
      "Shuvam is a super professional musician and recordist. Highly recommended.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWJTKrH3RHr2DTnTVfUIjVRsmKJhiJe4xA54gapPa7caENZ-mbe=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Trishika Chakraborty",
    rating: 5,
    date: "5 years ago",
    review:
      "Probably the best  guitar classes in my neighborhood ........Sir is so much professional ..... Learning from a teacher like shuvam sir is my pleasure",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWVQRz1WjTS5hKXl6YEDHZMZBEuFI2TCOZUxKLla2KMPh8M-OA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "nishant sharma",
    rating: 5,
    date: "2 years ago",
    review:
      "Friendly guy , full of energy and a great knowledge of music , loved the environment and his skills . Excellent 👌👌 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW6qYN8KZ5Guv8UittyIQGR1PidbPc-CS8_Fhn1mpjKlLhMifk=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 2 years ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "SK SHAIF ALI",
    rating: 5,
    date: "7 years ago",
    review:
      "He is Excel in playing guitar. & Also good knowledge in sound effects. And he very good & friendly person.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVvC8F4D98dJojLemXJ--zrHbQ00SyvlHwCRtWAYL2Bv_ISNF8=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 7 years ago\nThanks for ur feedback.",
    sentiment: "positive",
  },
  {
    author: "Sweta Mazumder",
    rating: 5,
    date: "3 years ago",
    review:
      "Have learnt some good guiter lessons from Sir.He is  very knowledgeable and experienced guiter trainer.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUi3hcthKENmhehGKdoOioYchSMBtGKWngXyL1fnL7Hl-4UBzBg=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur kind words.. ☺️",
    sentiment: "positive",
  },
  {
    author: "Debaditya Chakraborty",
    rating: 5,
    date: "3 years ago",
    review:
      "Amazing teacher and a great guitarist...I'm happy to learn from Shuvam sir 😊😊 …",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJvfYUv_dsBcvV_OumQD6KcgOD-A3u7trZKnS5sEMwIB59wv-A=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Saibal Chakraborty",
    rating: 5,
    date: "6 years ago",
    review:
      "Very friendly atmosphere which actually helps to learn fast...and as students are getting trained one at a time, that also benefits a lot...",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV319UXjENEfvk_ncs8zSFYbpOWXD_6e-mIWfmBqwqDprTYD08W=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words ..",
    sentiment: "positive",
  },
  {
    author: "Sulagna Roy - 11 G - Aditya Academy",
    rating: 5,
    date: "4 years ago",
    review:
      "He is a good and experienced teacher. He teaches theory as well as practical in a good timely manner.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWwdRzBXRPuwakJa0WO2viTpR-t_nPorhAcbGME7pE_sxRz00YIKQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 4 years ago\nThanks for kind words.",
    sentiment: "positive",
  },
  {
    author: "Simran Sarkar",
    rating: 5,
    date: "2 years ago",
    review:
      "Loved the ambience and the set up. Perfect studio with a reasonable price.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWrYwvJHvHWwNXUPqkbZeTYJbsQJvSmDLVnNChilTpeT3DxD--kBQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Soumyadeep Dutta",
    rating: 5,
    date: "7 years ago",
    review:
      "Shuvam bro my child hood friend come brother... He is a very good guitar player... Love you Bro",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJdTpCw_fuVvD8fA2TnMYQd86TI6vZRMgNnU_K9R0dL5rkeFQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sonali Banerjee Official",
    rating: 5,
    date: "2 years ago",
    review:
      "Best place for music creation... Great quality music production. Highly recommended..",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXP63uYXFxEq9vqSdEQNRAvnFXJ7KZUzQYaA-oqz_RaYVz8UNb-=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Subhajit Sil (Jit)",
    rating: 5,
    date: "Edited 6 years ago",
    review:
      "Awesome teacher.  Take the first step to your passion / career with Shuvam.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXAU0q11nLKQ_XnaWZ_CBepl6v0ZTP7yr2u2Xd0jGGKD-SmaR35jA=w36-h36-p-rp-mo-ba5-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 7 years ago\nThanks for ur valuable comments.",
    sentiment: "positive",
  },
  {
    author: "Hema Roy",
    rating: 5,
    date: "2 years ago",
    review: "One of the best professional and updated setups of north Kolkata.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXSRKJ6UJRNzt_3koT2GkZvlLxJH1134A-L1nY8eINSWVWbERkR=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "DR. ABHISHEK GHOSH",
    rating: 5,
    date: "2 years ago",
    review: "Great studio with inspirational very much talented composer.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocI1lQpYmz5b7evu_VN4GuO8TTyoSyFnJmN_5fXVgAPIFKD_419f=w36-h36-p-rp-mo-ba4-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Alapan Ganguly",
    rating: 5,
    date: "2 years ago",
    review:
      "Well designed studio with upgraded gears with experienced sound engineer and musicians",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUQg547K3QcDA6U8h7E51XBi4FJj3EMrgcBpTu1hXbHoUoaGZo=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Arkaprava Majumder",
    rating: 5,
    date: "5 years ago",
    review:
      "Makes every lesson so understandable to me.....and very much friendly to the students.....",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjURBPDxJhTnxylD8YLmk8Z3p-bnvy_F46XA1URPriohdTVRDS6_=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words. ☺️",
    sentiment: "positive",
  },
  {
    author: "Amrita Banerjee",
    rating: 5,
    date: "2 years ago",
    review: "Just amazing setup..❤️👌🏻 great studio✨️ …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXO_EmeKoRmZCZf4B7nHuKhTNYTi8yMW9YikRh-b8DWuQ_cUUhwgg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Rudraditya Sarkar",
    rating: 5,
    date: "a year ago",
    review: "Sir is very good and teaches very well.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXvqevd15S5-LifU5NwyoEbniBQrqlotRPXiVTtzMVgHErWFbCW=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Kakoli Roy",
    rating: 5,
    date: "2 years ago",
    review:
      "Complete recording studio with well equipped every possible gadget and appliance.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUJDf_8C0iWpvxYLVzqhUdprJInz3mH_SYuS0NyLDVlncbIp9GOow=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "Anindya Sadhukhan",
    rating: 5,
    date: "6 years ago",
    review: "Amazing guitar instructor.. his way of teaching just fantastic ..",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVRliSfviEni9oGGAlIbFtXWKwOvsaRi_bS3xkbWCnMiIduMzNM=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words..",
    sentiment: "positive",
  },
  {
    author: "Joy Saha",
    rating: 5,
    date: "6 years ago",
    review: "Very Good teacher & also a very friendly good guy...:)",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocI9oH-qU_YiVwOggoKZ0c7Dv57L91q8Qr8FkGc1kO6bx319n7Ic=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Raja Dey",
    rating: 5,
    date: "6 years ago",
    review: "He is a Very good teacher and  he also a very good guy .",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIE1441tqxBIxvJHbyKBQSfrRJVUynOtp3pyp_MdQvuOfVhnA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur valuable comment.",
    sentiment: "positive",
  },
  {
    author: "Avirup Tikader",
    rating: 5,
    date: "2 years ago",
    review:
      "Great studio .. must visit this studio .. awesome ambiance ❣️❣️😌 …",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIOfJJ50DNgldH_AzBuZoRuMteTfbfltnk2Ef-r9Ij5MTsFUU1F=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "ekannt singh",
    rating: 5,
    date: "5 years ago",
    review: "Good guitarist and good teacher. Worth paying the fees. 👍👍 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVh9UJZhsfpROTxc7ek1l4gAY0OHFSeTyr1u5unOhjfI37wis4=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 5 years ago\nThank you Sir ☺️",
    sentiment: "positive",
  },
  {
    author: "Puja Sen",
    rating: 5,
    date: "5 years ago",
    review: "Very good guitarist..🎸..nd also gd singer...🎤 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWUEnRvrVmIRSEagoYIMCH6x0kMuf--_uYjHBhtBiq0WcFOIg5f=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 5 years ago\nThanks",
    sentiment: "positive",
  },
  {
    author: "Madhurima Banerjee",
    rating: 5,
    date: "6 years ago",
    review: "A very good teacher!. Made learning easy and interesting.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWUWOHASAI_Rr-XGMOBOkoDoRGHgn5l2AqIBidzsgP-GqdTpGgG=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words. :)",
    sentiment: "positive",
  },
  {
    author: "Sayan Datta",
    rating: 5,
    date: "2 years ago",
    review: "Very Good Setup and equipped with modern gears.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocKMR5Gt7iecEqq918vUoOuar16EEpr0pjzMkDMsiyRmJSQXBW1U=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Nandini Chandgothia",
    rating: 5,
    date: "2 years ago",
    review: "Wonderful setup... Great studio 👌 …",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJTW5VIErGm2GXjGTmvrgdQyNVciIW_t2aYdsQ9lhfnl8QJcw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "N P",
    rating: 5,
    date: "7 years ago",
    review:
      "awesome,...classes are phenomenal,very helpful for the learners,...good job😍😍😍 …",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocK_erXyrqR82q0nE9SpYuJGVr1_X49zz5yK9UIp0iB4FkW4nXA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 7 years ago\nThanks for ur feedback.",
    sentiment: "positive",
  },
  {
    author: "Sudipa Mitra",
    rating: 5,
    date: "2 years ago",
    review: "Outstanding studio....very friendly behaviour",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVALgYQ7QNFWO7HytJGAh_DlLhKC5Qh7WR746ETWV0TxNIh_rgZ=w36-h36-p-rp-mo-ba4-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "SOUMEN CHAKRABORTY",
    rating: 5,
    date: "7 years ago",
    review: "He is a very good teacher and He is good human being....",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXZSKbj5K1JTkABaeEOBpueub5AMtFG4nB0jkU--as5UM3a5fvk=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 7 years ago\nThanks for the feedback.",
    sentiment: "positive",
  },
  {
    author: "DRUM O LOGY",
    rating: 5,
    date: "6 years ago",
    review:
      "Have a good knowledge of his subject .. in one word, a good teacher .. :)",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXX7TE4xV2Is8czAzfRQ0VQDUIfMwHCAgXfUnUpjDrc4X35646Y=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur kind words .. :)",
    sentiment: "positive",
  },
  {
    author: "ABIR SARKAR",
    rating: 5,
    date: "2 years ago",
    review: "Wonderful work experience nice studio",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXO3BWSQ71KEjcjdFuBVG7dmDykgeIVyIFR4QDVJKqfkMwnHJR8=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Puja Das",
    rating: 5,
    date: "2 years ago",
    review: "Great set up with wow ambience",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUzMOVQJGYYfYSp6uwzqaHcr20CrcOd-JIblV1PxGtJEqIxkFrw=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Putul Bhattacherjee",
    rating: 5,
    date: "5 years ago",
    review: "Very supportive teacher .. Thank u sir ..",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocLz7tShM52qnfxFaQYnN04qXjCoaiUs3zqDL2zZsr5wdx1M4w=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 5 years ago\nThanks 👍☺️ …",
    sentiment: "positive",
  },
  {
    author: "Tanay Nandi Official",
    rating: 5,
    date: "2 years ago",
    review: "Nice set up 10 out of 9",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUSF3oQdA6Mdm0Y1TpgB9DSBhn1dtXUKhJDXfEjHsReBGrFx7oSxw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "arnab chowdhury",
    rating: 5,
    date: "2 years ago",
    review: "Excellent studio … recommending everyone 🎶 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV1PWJe_Lz7LTUwxdSGZmso6phFrL84Y620wo1XYV5ow6XA-Ebf=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Mukesh Maiti",
    rating: 5,
    date: "2 years ago",
    review: "Cool ambiance With good vibes 💯 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW9lOTz5XQ7IuXedj55_j7Z-FWUrdLW3Va9JVuC8N_pIwtBZuc1=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "aman agrwal",
    rating: 5,
    date: "7 years ago",
    review: "Strongly satisfied.. best teacher",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXAl3tF6z03lNfe74S5Q-3zA9aCz7RjSmz9GE6Uw5ns1NTKlFI=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 6 years ago\nThanks for ur feedback ..",
    sentiment: "positive",
  },
  {
    author: "Hrishav Ganguly",
    rating: 5,
    date: "5 years ago",
    review: "A very good place to learn Guitar 🎸 …",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJBUaqHnDuzXKw439mmoYC8VNasHleJwIcZeZC-clsHgWfgaOSZ=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Tito Dey",
    rating: 5,
    date: "2 years ago",
    review: "Very beautiful studio.. 😍 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV2s45diOMGHGsXFfGtM4rLwbUAeHyc5a8RTAw20Zlue77nko3DMg=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "CHANDRIKA MUKHOPADHYAY",
    rating: 5,
    date: "2 years ago",
    review: "Good equipments with reasonable price",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXYdvX_rngNEdZ7FvWd1GREmskWA0x6VUJjaBErAXsWgzWtscE=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Sriparna Ghosh",
    rating: 5,
    date: "4 years ago",
    review: "He is amazing  as a teacher.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWjgo7qa4IJ8TppKyrfpOz8RmeRFbI24BFmhDrEB0HOi-mbFUn6=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Amitava Bhandari",
    rating: 5,
    date: "5 years ago",
    review: "Excellent student friendly teacher.",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJ-Q46lVruz438Rsk9GAUY2RloELNJSAuTVuGYLbW-4_RFcrg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Silpi Mitra",
    rating: 5,
    date: "7 years ago",
    review: "Excellent teacher and guide for guitar",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIG3T3Hgz1_tdew5q0j_y1_P_F0YNFgkPunyJ4CLW_CNJiC=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 7 years ago\nThanks for ur feedback.",
    sentiment: "positive",
  },
  {
    author: "Robert Augustine",
    rating: 5,
    date: "6 years ago",
    review: "Wonderful guy, equally talented 👍 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXzU2Lcb5YK_-tzeGCyvN4FYRv3tDBXMTcy9_1qACaxpyyFmpCR=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 6 years ago\nThanks 😊 …",
    sentiment: "positive",
  },
  {
    author: "deepika chandra",
    rating: 5,
    date: "7 years ago",
    review: "Plays and teaches guitar very  well👍 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV-n8K4sKUDW0WS9E1mdvIx9azplegr9NpgFwICb9I6AO3wFY-z=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 7 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Sayak Kundu",
    rating: 5,
    date: "7 years ago",
    review: "A great teacher with deep knowledge",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUmayu6mi-H8Jq-mAfJDVJ5n-IBMTrWrdLR1kdDec_J4oWgRKQ3=w36-h36-p-rp-mo-ba4-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 7 years ago\nThanks for your kind words ..",
    sentiment: "positive",
  },
  {
    author: "sangita paul",
    rating: 5,
    date: "a year ago",
    review: "Very good.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjU1-YhbsOCvuCg3F4eTwaRObZ_gO5s04Fzp85P4i0vSnosHAhh1=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Tandra Chatterjee",
    rating: 5,
    date: "5 years ago",
    review: "I enjoy learning here.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXvB5HNc1Z-q3BSVf5CoHCio8bhNZQvsyCODt5RWYsTLz2XNO8=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 5 years ago\nThanks ☺️",
    sentiment: "positive",
  },
  {
    author: "Gyanjit Patar Official",
    rating: 5,
    date: "Edited 2 years ago",
    review: "Friendly guitar teacher 😈 …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUODU88mDAdhIA3WD-xUTpP9Rw0JATW7bFsxvku7NXM303GS262=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words.. ☺️",
    sentiment: "positive",
  },
  {
    author: "PRAHAR INDIA",
    rating: 5,
    date: "2 years ago",
    review: "A professional studio in Dumdum",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIe2UnmE-F86EFLDwhuCTnP2wNXiytRpxNDRDYUWnqQ8kvn3A=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner a year ago\nThanks for your feedback.",
    sentiment: "positive",
  },
  {
    author: "Sweta Chatterjee",
    rating: 5,
    date: "7 years ago",
    review: "Good job bro...",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWfHZFbJGN4vlrBFKTAHqCTLBFDq72BMwaXuxVxdm09MY54EmZc=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Santanu Raha",
    rating: 5,
    date: "7 years ago",
    review: "excellent",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIcvNd43grZzZVL0B7VA7CXJklWdFOyWf5YU4PybY__0IRg1Q=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Subhamoy Mallick",
    rating: 5,
    date: "7 years ago",
    review: "It's awesome....",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXzUcDqKeuezp2Nu0pjrsa7NN83u3hrfIYMhq5yzsxj453k-dVW=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Punam Sadhu",
    rating: 5,
    date: "7 years ago",
    review: "Awesome",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocLbIoqg6lNU9MxCrFrOK9DHZoxb-QUmSx_yNr9WdvtlG6eTiw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Souvik Datta",
    rating: 5,
    date: "7 years ago",
    review: "A big thumbs up",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWeCq53nHK9sHYa48s9X5fgSSHHVJ-M6piShR_DjsxTSgdilEQn=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Arunava Sadhu",
    rating: 5,
    date: "6 years ago",
    review: "A good teacher ..",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocKDoOgobKi9DIq9yail-OVUV9m4E49hHGl8UdsSC2eHw9fRGw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 6 years ago\nThanks.",
    sentiment: "positive",
  },
  {
    author: "Saibal Karmakar",
    rating: 5,
    date: "6 years ago",
    review: "Good Guitarist!!!",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWUISI7Dg5XAmHBMMTAQWeX8iwuziVknuWWl0a47kh_b3Qbk_-7=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "Response from the owner 6 years ago\nThanks 😊 …",
    sentiment: "positive",
  },
  {
    author: "Jyotirmoy Biswas",
    rating: 5,
    date: "3 weeks ago",
    review:
      "Shuvam sir is undoubtedly one of the finest guitar instructor in Kolkata and I'm glad and lucky that I could get him as my mentor. His way of teaching is exceptional and he has immense knowledge regarding tone settings, various types of …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVCPRBdHyJm3ci3J4GP84t6DRkEiilTlbQMsJYM1p12dTaGNxf3=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 weeks ago\nThank you so much, for your kind words and detailed feedback! I’m truly grateful for your trust and dedication. … More",
    sentiment: "positive",
  },
  {
    author: "Rajib Adhikari",
    rating: 5,
    date: "7 years ago",
    review: "Excellent",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIekVCyXromIkSDnun8jKUL5fJtpvkm4RFjvabbbOj7X6NVYg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur feedback 😊 …",
    sentiment: "positive",
  },
  {
    author: "Jayee Biswas",
    rating: 5,
    date: "Edited 3 years ago",
    review:
      "Shuvam Sir is a very good guitarist. Sir khub sohoj-sorol bhabe guitar r theory & practical bojhan. Sir always very prolite & helpful person. I respect his personality.",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXN5awPC8WROzC7Cd1O2d3JmlFT_tZvGQ0gPuvFMl0vPWs7kjsn=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 3 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Bakul Sadhukhan",
    rating: 5,
    date: "2 years ago",
    review:
      "Standing in the heart of Kolkata, this is an ideal studio for a dream singer and a half.. The right setup is all available here to make yourself an individual and an artist.. Along with good usage, it is also equivalent, which I have …",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUDh-QrIsPywIEHGA0Keq3d4IFCVvGVzGQZAVRkcM4K1oA2LMCB=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner a year ago\nThanks for your kind words.",
    sentiment: "positive",
  },
  {
    author: "MAYUKH SUKUL",
    rating: 5,
    date: "5 years ago",
    review: "Sir khub ii sundor vabe and easily bojhan and khub ii friendly ..",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXFnrBlQq3au9PfEmkcGkeG2AmJ5HAGEOLIOp5nH2yCTxNjXg4d=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply:
      "Response from the owner 5 years ago\nThanks for ur kind words.",
    sentiment: "positive",
  },
  {
    author: "Sharmilee Acharyya",
    rating: 5,
    date: "4 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIGytTNKvsUdmqpj6B4C5vqEumkF9ybynvovyoVVR-49I8hKQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Farhan Zahid Khan",
    rating: 5,
    date: "4 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocK1fIngAIcPzJ72cmh6libisJqJIA9B9PUpNz2PlOBvP0HqF7w=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Amit Dutta",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUYt-oUtY3NPUJt-AQEO-pBDXN8gDQU3__zMnEgl64ARxUMajQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "TEAM X Gaming",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVFxAxnnvYSi3m8AEyvPQs-SfjJwk_RhGymSnw8zvZpS__u1w=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Pritam Hazra",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocK2EXHd6S6-h-8X_G0LeVGYL51hxhFdMYEGEgoi-9P7Eb87zQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sunidhi Agrawal",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUDk054a0UeQkvjBjUnURYCKdMjwjeVc3O_k1VES12wN6dTpY8gPA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Saheli Das",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV_v3uhtTbNmwAvN4zLBhDD-bavEkJduKaZJnnhqyWO7MDA95y2=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "tannistha roy",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUYLIojcaqM6-BSZLrej95HKuBA1M9OeUZftrsaehIPBFwdqSE=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Keshav Tekriwal",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjU9a0Lqkp3rHapinUMjP2iteeOWr1lcJkM4JQk7EyrU1MQAw6rh=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sanchari Chatterji",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWcwIL18wYiAmwNMQ-85EXpuZlhOhtP35_IY2jI4r-a_tr4Ss6g=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Agni De",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJ4xT0OiF8Zs9TVn7JfJt2fXLaOxQFfix2Cl43Jz9V-5sIu4w=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sainoor Alam Mridha",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW3D-iQb7BVsZz5QRvbVYxKuTGDrYTRO-wGHRpd6qhsE4a5CvKQyQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Dibyendu Deep",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXGWM10hJuYMErWnMoe4U2NXdPPmHdZoHWatTHRMVhMVXQ8yC07=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Ananda Biswas",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVyc4Pxf9sccKRUTfBRZdLOEhQOYNTuFSA_pGb2yTK4aZ-EsK4a=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Kaustav Ghosh",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUN2Rn4zWGBjHnHOCF65YlI3p1kTZqPb_lmnOEQ5lH9t7WlLFl3hw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Alik Karmakar",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVWtV4AgUB55iZNgGfwGqGOss3gw4HxO22qV58BT7ef0284gIYBOg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Samuel Arko Singh",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWsJvgFpeoWfBJWhNZiZCsXPbMWnghrpUyV_q1vBVo8fQC4Z3Wp=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Kusal Bhandari",
    rating: 5,
    date: "5 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVFjqLhuTQGstYYwJ6n8k5gLlXmJ8PHAXrB7Fy_q-Lh-nI09R_aFA=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "dibyendu mishra",
    rating: 5,
    date: "10 months ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW2HOUrls86JT2qntSrIeEv79mHiN-EIy1Z_ihAfU5slfHFEfsI=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Saswata Sahu",
    rating: 5,
    date: "10 months ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVzPF1AMxYJ-CGKMnnZrbPNrzJruzRqTFeKGxFwkZxueeg8Wo1b=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Nandika Banik",
    rating: 5,
    date: "10 months ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW2a5xHX7LUcXpYxrcn2CHpxXrAxFEbjSnaBvljF-z3K7Nw5Pw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Shubhajit Saha",
    rating: 5,
    date: "10 months ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocL2aH1-ttvl2kpxlTEA6Lccr8n8xEHBWCq3ImnY4x2Ag36vrg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Basabdutta Biswas",
    rating: 5,
    date: "10 months ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjW1SodRnC1gaWF9Da19g9bbaGE1DsaqhhHoPqQ0_E6s-LfSq2i6=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sulekha Mondal",
    rating: 5,
    date: "a year ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIWUSOlCAfnZ9LCRYyxLuecu7Ckc2njdqD8TxYq5nCndynOeg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sagar Barik",
    rating: 5,
    date: "a year ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXS3qVzIKaR6ozd8ab9QZN1Emz2qTrsBahaLw7_sVYam5Yjp6noUQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Rusha Podder",
    rating: 5,
    date: "a year ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUnNdzVyZ7CkHu1j3owG0Ghlqwt24jXtCXXDZPmP84ZD7jGfb_Q=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Raunak Bakshi",
    rating: 5,
    date: "2 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWKoNlvt21P3RZVcqLdzNDF0VHTKQCMUI2ukjxD5b2aUb_yKw8oeg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Buddha Barik",
    rating: 5,
    date: "2 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJG3_glrwFt9nARbvPastvPfjXeglWs4bZyAncb7CXhkfiwMg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Studio_ D.r.c",
    rating: 5,
    date: "2 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXXS6C3ZuUYT4w1k0TtcOYTQAaWlWgtK-4o3vYv1k65oosF-DTISA=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sayan Dutta",
    rating: 5,
    date: "2 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWyl5SIgaG5LD1GAd5vEU4fgHdj3VNmhhaqfHoMntRPBzq87-6C=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Saptak Chatterjee",
    rating: 5,
    date: "2 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVn0F7-4IbjWHlOQvflZmsoUVY-7e82j1T3gCxdNTGiAcF8QtV_5g=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Narmada Biswas",
    rating: 5,
    date: "3 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocI7GGq1MFDMp1TiftbNjp9qaFlu1VES750yPvNmIPLhT0Hlsw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "north west",
    rating: 5,
    date: "3 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXY-Tk85-6dtgxRWYdJPySTOB5A2ulipLQy2uW7yKKpBZq7-Bg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Dr. Tapasi Bhattacharjee",
    rating: 5,
    date: "3 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV-hDd91Hd7gHle3ylsSNyZ6Ocg3OC983ElMhVVUXgtd26U7D3T=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Ipsita Maity",
    rating: 5,
    date: "3 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocKs-1-Tl9WurcDv8MVjS0_4Mv1mfuZiANnHg_te5hvHYqv_3g=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Akhilesh Agarwal",
    rating: 5,
    date: "4 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXtYU4U81EHlHidsizXizpFBV4I_T7tcEwV0KMEgpZcm1h4sFI=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Trisha Sinha",
    rating: 5,
    date: "4 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUS0sSnC6jmvnT-w_3fHkto_ZwL20MR7rRTNbgMbfRTTNITL8Xg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "MANISHA ADHIKARY",
    rating: 5,
    date: "4 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocLBscisZFj1qwiM8jhgIlU8nfrJUdFw9JTZGDtXKpwAgrKgxA=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Samiram De sarkar",
    rating: 5,
    date: "4 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXfznwc-QVNtFlyOIvJ7gGNdNcLjyKqcnrsfVgjokIkZ40Gkgmm3A=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Niladri Sekhar Adhikari",
    rating: 5,
    date: "6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUTrDewnSe9ZVZRD6hu6OuQedQM03d08I_HwI29l-VINyehHZ0NLw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Vairagya",
    rating: 5,
    date: "6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVtUHd3aZzEQuYxOmc5lvuLpg5ZLC43AmQG0S3rXByG7xSRimyl=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Neha mishra",
    rating: 5,
    date: "6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocJOWq9kBkboumx1xr9gflw4zyid_Zfdn4y6xWLCd7yBy1SIuw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "shubham sarda",
    rating: 1,
    date: "Edited 6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocK7GLNYHMI9hKNo-fr8dH67gAxuqZJij6R1Bb_mUCtr7Kxgkw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "negative",
  },
  {
    author: "Ruptrishna Basak",
    rating: 5,
    date: "6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjVeDws-CaHcA1w9U1plKXqhRfjEfA6niYTCuIuDt4ZKFJXN9ANK=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "zaggurat dicosta",
    rating: 5,
    date: "6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXsQCeu3hOaJhHkpUB8JF1SkKObXqhlzpfUDyDoO4dlAwZwFaw=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Swaranya Sarkar",
    rating: 5,
    date: "6 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjV6csDeIgG9KQMXJ8DCWu2r9t41By3xzABkt42jxr4WFbsNTi0Bwg=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Sushweta Chakraborty",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocI8WBEHhoLALRRpNViCJiiDir13QCnZtDB8f9Qruao0HcWcNQ=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "arun banerjee",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUU4KVtywbiLuz6wHREBjCuFifm2AT6LKjIOlYlSozdfy-sTbtj=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "shreya mallick",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUlzSHGxnJ6zcxWFsTTZvkyQjWV2HEmfJGX3hSYInVQLGXfQebE=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Shazia Qureshi",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjXYEOoz3xa9NVt_vIBk-GBHFLtKBFZSFN0AEJWjZ-VN5OTXxYN4=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Avijit Dutta",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a/ACg8ocIgaVAcUdUnrzKfw8ffz-D1jR2FEx4qEtfcA8sfZ-_Gh00b6g=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "rahul jaiswal",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUmyGSSnbemoS5-4kvrfjQ82MvZRb4aE7UQO6_zpNaiLIPvsOZAwA=w36-h36-p-rp-mo-ba3-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Biswadeep Chakraborty",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWiUb8ghfGvZEEv1tMCH7owfIeEvqmdcIhttvct9FvUyTDniPUN=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Abhijeet Mallick",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWE3py2CInBgFAx7Xa4E5J4hVrPm8dPKyv7GyB-8gVNC2G-Y93u=w36-h36-p-rp-mo-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Surajit Sen",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjWh5JIlgOZP4mSEg7VS29dn7oZcqdmu2PhdngrpTe9pxRIxPa1K=w36-h36-p-rp-mo-ba2-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
  {
    author: "Arka Paul",
    rating: 5,
    date: "7 years ago",
    review: "",
    profileImage:
      "https://lh3.googleusercontent.com/a-/ALV-UjUKrYOTx6rgQcCP4vUe7nNBBKC-_mjoRtvPeAuVsUb58DzJhx_k=w36-h36-p-rp-mo-ba4-br100",
    reviewImages: [],
    ownerReply: "",
    sentiment: "positive",
  },
];

// Split reviews into two rows for the marquee
const topRowReviews = allReviews.slice(0, 4);
const bottomRowReviews = allReviews.slice(4, 8);

// Component for a single Review Card
const ReviewCard = ({ review }: { review: (typeof allReviews)[0] }) => (
  <div className="w-[320px] sm:w-[400px] shrink-0 p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      ))}
    </div>
    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
      &ldquo;{review.review}&rdquo;
    </p>
    <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
      <div>
        <h4 className="text-white font-bold">{review.author}</h4>
        <p className="text-gray-500 text-xs sm:text-sm">{review.date}</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.profileImage}
          alt=""
          className="rounded-full h-full w-full"
        />
      </div>
    </div>
  </div>
);

export default function Reviews() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#05050A]"
      id="reviews"
    >
      {/* Dynamic CSS for the Infinite Marquee */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: scroll-right 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-600/5 blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-12 lg:px-20 mb-12 sm:mb-16 text-center">
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <BadgeCheck className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              Student Success Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Trusted By{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              150+ Students
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
            Don&apos;t just take our word for it. Here is what actual students have
            to say about their learning experience.
          </p>
        </div>
      </div>

      {/* === Infinite Marquee Rows === */}
      <div className="relative z-10 w-full flex flex-col gap-6 marquee-container">
        {/* Top Row (Scrolls Left) */}
        <div className="flex w-max gap-6 animate-marquee-left px-4">
          {/* We duplicate the array to create the seamless infinite scrolling effect */}
          {[...topRowReviews, ...topRowReviews].map((review, idx) => (
            <ReviewCard key={`top-${idx}`} review={review} />
          ))}
        </div>

        {/* Bottom Row (Scrolls Right) */}
        <div className="flex w-max gap-6 animate-marquee-right px-4">
          {[...bottomRowReviews, ...bottomRowReviews].map((review, idx) => (
            <ReviewCard key={`bottom-${idx}`} review={review} />
          ))}
        </div>

        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#05050A] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#05050A] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
