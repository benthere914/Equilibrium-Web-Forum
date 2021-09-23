'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Posts',
      [
        {userId: 2, topicId: 1, title: "How to flyfish", content: "With fly fishing, the idea is to catch fish by getting them to bite on an imitation of a bug or bait fish on, or just below, the water. When you’re learning how to fly fish, it’s best to begin by understanding fly casting basics like your equipment needs. To start learning how to fly fish, you need a fly rod, reel, weighted line and some artificial flies. Flies are made using fly tying techniques that combine thread, wire, beads, feathers, yarn and hair to create artificial insects and bait fish at various stages of maturity to attract trout, salmon, pan fish and carp, as well as marine species such as tarpon, bone fish and striped bass. When learning how to fly fish, remember that this method of fishing uses techniques that are more challenging than other types of fishing. The important thing to know when mastering fly fishing for beginners is that it involves casting a very light-weight fly instead of a heavier lure or natural bait.As you set out to learn how to fly fish, you’ll want to look for an ideal location. Most people think of fly fishing as a sport best enjoyed in mountain streams. Though these types of waters are great places to fly fish, you can also enjoy amazing fishing in the warm waters of ponds and lakes, and in salt water - and catch a broad array of fish. There's probably a body of water you can use for fly fishing not too far from where you live, especially if you are just learning how to fish. - https://www.takemefishing.org/how-to-fish/types-of-fishing/fly-fishing/", imgUrl: "http://showlowchamber.com/wp-content/uploads/2021/08/FF.jpg", createdAt: new Date(), updatedAt: new Date()},
        {userId: 4, topicId: 2, title: "Best places to camp in Alaska", content: "There's only one place in the United States where you can see glaciers, rainforests, and the Northern lights, all in one trip. The magic is in the numbers: Alaska has more than 33,000 miles of shoreline, and 60% of the state is public land. For campers, that means that there are great campsites and killer adventures around every bend.The best part? You don’t need to go far to get into the wild. An easy drive from Anchorage takes you into Denali National Park. The park has 6 million acres of wildland—and just one road!Alaskan camping options are just as varied as the landscape. Try paddle camping in the soaring Kenai Fjords, or hike to remote backcountry tent sites in the Arctic National Wildlife Refuge. If glamping is more your thing, enjoy the ocean view from your luxury yurt in Kachemak Bay State Park.In Alaska, you'll find an experience for everyone. In the southeast, watch bears roam along Glacier Bay and humpback whales surface above the waves. Near Fairbanks, you can soak in natural hot springs under the aurora borealis.Summer brings warm, sunny days that are ideal for hiking; in the fall, the tundra near Denali blazes with color. If you're the hardy sort, winter camping brings unparalleled cross-country skiing and snowmobiling across the state - https://www.hipcamp.com/en-US/discover/alaska", imgUrl: "https://uploads.alaska.org/advice/e/everything-you-need-to-know-about-car-camping/_1200x630_crop_center-center_82_none/alaska-everything-you-need-to-know-about-car-camping-GetLostVans_SpringPicnic-2019.jpg?mtime=20201218062008&focal=none&tmtime=20210610194652", createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, topicId: 4, title: "You wouldn't believe what these flowers looked like after they froze", content: "Freezing temperatures can cause brown, crispy growth on plants that are susceptible to frost damage. Frost damage can occur when temperatures dip to or below the freezing point, 32 degrees Fahrenheit (0 degrees Celsius). And both cold-hardy plants and tenderer plants that do best in warmer temperatures can, depending on the circumstances, be affected by frost damage.Growth damaged by frost can look ugly, and your first impulse may be to prune it — but don’t. Believe it or not, you can do more damage if you remove the damaged growth too soon. In fact, those ugly brown leaves actually help to protect the interior of the plant from future freezes. So, let’s dive into frost damage — how it affects our plants and, more important, how and when to prune frost-damaged growth. - https://www.houzz.com/magazine/got-frost-damaged-plants-how-it-happens-and-when-and-how-to-prune-stsetivw-vs~40548361", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVfwdxWt4FV2Kkzbk6UefYtfy6raz9niLRQ&usqp=CAU", createdAt: new Date(), updatedAt: new Date()},
        {userId: 2, topicId: 3, title: "The best way to cook elk", content: "Elk is not difficult to prepare if you follow some basic rules.Here are some tips from venisonsteaks.comDo not overcook. The longer you cook Elk, the more likely it is to become dry. This is the cardinal rule.Elk should be cooked to no more than 130-140 degrees Fahrenheit of internal temperature. At 150 degrees the meat starts to dry out because of its lack of fat. The use of a meat thermometer is the best way to determine when the meat has reached the desired degree of doneness. Let the meat rest in the juices, covered for 10-15 minutes before serving.Frying/Browning should be done very quickly - do not overcook! Again, let it rest, covered, before serving.When broiling and grilling, you should cook to no more than rare, or at least medium rare. When you need to serve to someone who prefers meat well-done, marinating the meat in your favorite sauce will help keep the meat deliciously tender. Adding moisture when grilling quality venison is not necessary. However you may wish to spread a small amount of butter or cooking oil onto the meat prior to cooking. After broiling or grilling, let the meat stand for about 8 minutes before serving so that the flavorful juices can accumulate.Use tongs when turning or picking up elk meat. A fork will pierce the meat and cause some of the flavorful juices to escape during cooking.If you need to cut the steak into strips before cooking, first cut against the grain into thin slices. Then stack the slices and cut them into quarter-inch thick strips. Cutting is easier if the steak is slightly frozen.High quality young farm-raised Elk does not need to be marinated to change the texture or to mask the flavor. However a light marinate does help to keep the meat moist and enhances the flavor. Farm-raised Elk is tender and does not have any wild taste. http://www.montanaelk.com/cooking_tips.html", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS2GqJlPsYnZV-2FoDJSjW_tBiO7oXNu1e8w&usqp=CAU", createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, topicId: 5, title: "The best lakes to go swimming in", content: "Beyond their pristine settings and peaceful waters, lakes act like time machines, taking us back to carefree summer days spent swimming from shore to shore, racing to the swim platform, and watching a perfectly reflected moon rise over the smooth surfaces. - https://www.rd.com/list/swimming-lakes-near-me/", imgUrl: "data:image/jpeg;base64,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", createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, topicId: 11, title: "The Burros of Oatman, Arizona", content: "When driving part of Route 66 last week, my gal pal who was familiar with the area said we had to stop in the ghost town of Oatman, Arizona to see the free-roaming burros. This is not your typical equestrian getaway, but it was fun and worth sharing! “They walk up and down the street and you can feed and pet them.” With that explanation I was enthusiastically in! Oatman, Arizona and its famous burros are closest to Kingman, Arizona (cue the song Route 66 “Flagstaff, Arizona, don’t forget Winona, Kingman, Barstow, San Bernadino”) and you will have a memorable, fairly isolated drive down a two-lane road in the desert along the Black Mountains. I suggest going early evening (but not too close to sunset–unless you like driving in the dark on unfamiliar roads). https://saddleseekshorse.com/burros-oatman-arizona/", imgUrl: "https://i2.wp.com/saddleseekshorse.com/wp-content/uploads/2021/09/Oatman-AZ-burro-2.jpg?w=480&ssl=1", createdAt: new Date(), updatedAt: new Date()},
        {userId: 3, topicId: 10, title: "INSPIRATIONAL KAYAK STORY", content: "The question of why do I want to kayak is a good one. It is something that I have given a lot of thought to over the last month and this would be my best answer: When I was at my week long First Descents program people kept saying the river is a great equalizer, and I always rolled my eyes. To me at the time it felt like the biggest pain in the bum, a challenge to overcome every day something that was just making me angry and my body sore. Every day I would wake up early and make peace with the Clark Fork River and every day we would go at again, it was not until I got home that I realized what was meant when people said the river being a great equalizer. I laughed every day, I got a workout like no other every day, I got to hang out with really cool people every day, and most of the entire river didn’t care that I have two different medical conditions that make me different. Close to ten years ago I was diagnosed with a condition called Idiopathic Intracranial Hypertension (IIH), which Wikipedia says is this: “is a neurological disorder that is characterized by increased intracranial pressure (pressure around the brain) in the absence of a tumor or other diseases. The main symptoms are headache, nausea, and vomiting, as well as pulsatile tinnitus (sounds perceived in the ears, with the sound occurring in the same rhythm as the pulse), double vision and other visual symptoms. If untreated, it may lead to swelling of the optic disc in the eye, which can progress to vision loss.” Think brain tumor without actually having one, IIH has caused me to have dozens of surgeries, including 2 brain on the brain and two on my eyes.", imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_gAb-8rftWNK2Az_84mJLfDJj_HWPCsP8HQ&usqp=CAU", createdAt: new Date(), updatedAt: new Date()}

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Posts', null, {});
  }
};
