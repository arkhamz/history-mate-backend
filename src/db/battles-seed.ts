import { battlesTable } from './schema';
import { config } from 'dotenv';
import { db } from '.';

config({ path: '.env' });

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const data: (typeof battlesTable.$inferInsert)[] = [
    {
      name: 'White Mountain',
      location: 'Prague, Bohemia',
      prelude:
        'The naming of fiercely devout Roman catholic Ferdinand II as Holy Roman Emperor and king of Bohemia (czechia), led to the mostly protestant Bohemian population fearing the loss of religious freedom, rights and autonomy. In response to perceived violations of royal assurances of religious freedom, a group of Bohemian noblemen met with representatives of the emperor at the royal Prague castle. The meeting ended with the Royal representatives being thrown out of a window and seriously injured upon landing on a large pile of manure, sparking the Bohemian revolt. Emperor Ferdinand II set out to conquer Bohemia and quash the rebellion, with an army under Field Marshal Johan Tserclaes, the count of Tilly.',
      description:
        "A small imperial force was sent to probe the protestant rear, causing the surprised Bohemians to retreat. Tilly quickly sent in reinforcements, causing the forces of the Bohemian rear to crumble. The protestant prince of Anhalt-Bernburg, Christian II, tried to support his bohemian allies with a cavalry charge, but was countered and repelled by Tilly's cavalry. The Bohemian infantry, only now approaching the imperial army, retreated after seeing their own cavalry retreating. The protestant army scattered, the battle lasting only one hour.",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/0/02/The_Battle_of_White_Mountain_%28by_Peter_Snayers%29.jpg',
      video_url: 'https://www.youtube.com/embed/ZIEU_um0GfQ',
      result: 'Catholic Imperial-Spanish victory',
      date: '1620/11/08',
      latitude: 50.078333,
      longitude: 14.319444,
      army_one: JSON.stringify({
        beligerents: [
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
          ['Catholic League', 'https://i.imgur.com/ZCgBFLP.png'],
          ['Spanish empire', 'https://i.imgur.com/aGJkxBf.png'],
        ],
        commanders: [
          ['Johann von Tilly', 'https://i.imgur.com/ZCgBFLP.png'],
          ['Maximilian I', 'https://i.imgur.com/ZCgBFLP.png'],
          ['Charles de Bucquoy', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 23000, guns: 12 },
        casualties: '650 killed and wounded',
      }),
      army_two: JSON.stringify({
        beligerents: [
          ['Bohemian Confederation', 'https://i.imgur.com/ambnSQo.png'],
          ['Electoral Palatinate', 'https://i.imgur.com/EUhXyJs.png'],
        ],
        commanders: [
          ['Christian of Anhalt', 'https://i.imgur.com/EUhXyJs.png'],
          ['Jindřich Matyáš Thurn', 'https://i.imgur.com/ambnSQo.png'],
        ],
        strength: { number: 21000, guns: 10 },
        casualties: '2,800 killed and wounded',
      }),
    },
    {
      name: 'Lutter',
      location: 'Lutter am Barenberge, Germany',
      prelude:
        'Christian IV of Denmark, ruler of the Duchy of Holstein ( a part of the holy roman empire) and member of the protestant Lower Saxon circle, remained neutral during the early stages of the war, following the Bohemian revolt. He and the other members increasingly feared that Holy Roman Emperor Ferdinand intended to retake former catholic lands in North-West Germany, now held by fellow protestants. This fear was confirmed when Catholic league forces led by the Count of Tilly, and an Imperial army under Albrecht von Wallenstein, attacked Magdeburg. Christian was appointed commander of the saxon forces, with Ernst von Mansfeld and Christian of Brunswick as fellow commanders.',
      description:
        "The Danish-German army led by Christian abandoned their attempt to assist nearby protestant fortresses at Munden, Northeim and Gottingem, following their capture by the count of Tilly and his forces. After harrassment by Tilly's cavalry, Christian decided to make a stand at Lutter am Barenberge. The imperial infantry broke through the Danish line on three occasions but each time was repulsed by a cavalry counter-attack. Eventually, the Danish army was no longer able to maintain its ground and when its entire artillery fell into the hands of the enemy, panic set in and the Danes retreated towards the town of Stade.",
      image_url: 'https://i.imgur.com/6DVHDkM.jpg',
      video_url: 'https://www.youtube.com/embed/GDd_2tbt_A8',
      result: 'Imperial Victory',
      date: '1626/08/27',
      latitude: 51.99,
      longitude: 10.271111,
      army_one: JSON.stringify({
        beligerents: [
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
          ['Catholic League', 'https://i.imgur.com/ZCgBFLP.png'],
        ],
        commanders: [
          ['Count of Tilly', 'https://i.imgur.com/zg6kPGq.png'],
          ['Graf Anholt', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 24000, guns: 22 },
        casualties: '2,000 dead or wounded',
      }),
      army_two: JSON.stringify({
        beligerents: [['Denmark-Norway', 'https://i.imgur.com/FQeo5f8.png']],
        commanders: [
          ['Christian IV', 'https://i.imgur.com/FQeo5f8.png'],
          ['Philip of Hesse-Kassel', 'https://i.imgur.com/FQeo5f8.png'],
          ['Fuchs von Bimbach', 'https://i.imgur.com/FQeo5f8.png'],
        ],
        strength: { number: 21000, guns: 20 },
        casualties: '4,000 dead or wounded, 3,000 captured',
      }),
    },
    {
      name: 'Siege of Stralsund',
      location: 'Stralsund, Germany',
      prelude:
        "The defeat of Ernst von Mansfeld and Christian IV of Denmark by Albrecht von Wallenstein and Tilly, respectively, led to Christian's expulsion from North Germany. This left the Duchy of Pomerania, which included the city of Stralsund, vulnerable. Stralsund declared neutrality but was to be occupied by Imperial forces led by Albrecht von Wallenstein. Stralsund refused to submit and was besieged by Wallenstein's forces. It sought military aid from Denmark, and then from Sweden",
      description:
        "Wallenstein organised regular attacks on the city's fortifications, which were defended by Sottish mercenaries under the employment of the Danish. Wallenstein's forces successfully captured the outer regions of the fortifications, then proceeded to bombard the city with artillery. The city later received reinforcements via swedish boats filled with Danish-scottish troops who immediately joined the defence of the city. Heavy rainfall during late July turned the battlefield into a marsh, making the attacker's situation untenable. Wallenstein ended the siege on 4th August",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Belagerung_Stralsunds_durch_Wallenstein_2.jpg/1000px-Belagerung_Stralsunds_durch_Wallenstein_2.jpg',
      video_url: 'https://www.youtube.com/embed/GDd_2tbt_A8',
      result: 'Anti-Imperial victory',
      start_date: '1628/05/01',
      end_date: '1628/08/04',
      latitude: 54.309167,
      longitude: 13.081944,
      army_one: JSON.stringify({
        beligerents: [['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png']],
        commanders: [
          ['Albrecht von Wallenstein', 'https://i.imgur.com/zg6kPGq.png'],
          ['Hans Georg von Arnim', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 0, guns: 0 },
        casualties: 'unknown',
      }),
      army_two: JSON.stringify({
        beligerents: [
          ['Denmark-Norway', 'https://i.imgur.com/FQeo5f8.png'],
          ['Kingdom of Sweden', 'https://i.imgur.com/FWz9l1C.png'],
          ['Stralsund', 'https://i.imgur.com/xrwFSE0.png'],
        ],
        commanders: [
          ['Heinrich Holk', 'https://i.imgur.com/FQeo5f8.png'],
          ['Alexander Seaton', 'https://i.imgur.com/a6fwxWi.png'],
          ['Alexander Lindsay', 'https://i.imgur.com/a6fwxWi.png'],
          ['Robert Munro', 'https://i.imgur.com/a6fwxWi.png'],
          ['Alexander Leslie', 'https://i.imgur.com/FWz9l1C.png'],
        ],
        strength: { number: 7300, guns: 0 },
        casualties: 'unknown',
      }),
    },
    {
      name: 'Breitenfeld',
      location: 'Breitenfeld, Germany',
      prelude:
        "Protestant Sweden's entrance into the war in 1630, led by king Gustavus Adolphus, was considered a minor annoyance to the Catholic league and its allies. German protestant princes also showed little interest in joining the Swedish cause. The sacking and massacre of the Swedish-allied city of Magdeburg by Imperial troops proved to be a valuable recruiting tool for the Swedes, attracting French, Prussian and German princly support for the swedish cause. In order for the Swedes to attack imperial troops in the south, they needed to pass through saxony. In order for Imperial forces to attack the swedes, they too had to pass through saxony.",
      description:
        "The armies drew up on a plain near the village of Breitenfeld, a few miles outside the walls of Leipzig. At first, von Pappenheim's reckless gamble seemed about to pay off: at the first charge of his cavalry, the  Saxon levies, which had not seen battle before, broke and fled the field. However, Gustavus nimbly turned his line to prevent Imperial forces attacking his rear. A daring Swedish cavalry raid captured all of the Imperial artillery, which was turned against its owners. Artillery pounded the Imperial forces until night fell. The imperial armies were utterly destroyed, losing two-thirds of their men and all their artillery and supplies. In one stroke, Gustavus had made himself master of Germany.",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Gustave_Adolphe_at_Breitenfeld-Johann_Walter-f3706497.jpg/1280px-Gustave_Adolphe_at_Breitenfeld-Johann_Walter-f3706497.jpg',
      video_url: 'https://www.youtube.com/embed/56mj5OqcqdU',
      result: 'Swedish-Saxon Anti-imperial victory',
      date: '1631/09/17',
      latitude: 51.417778,
      longitude: 12.377778,
      army_one: JSON.stringify({
        beligerents: [
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
          ['Catholic League', 'https://i.imgur.com/ZCgBFLP.png'],
        ],
        commanders: [
          ['Count of Tilly', 'https://i.imgur.com/zg6kPGq.png'],
          ['Gottfried von Pappenheim', 'https://i.imgur.com/zg6kPGq.png'],
          ['Egon von Furstenberg', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 37000, guns: 27 },
        casualties: '16,000 killed or captured',
      }),
      army_two: JSON.stringify({
        beligerents: [
          ['Swedish Empire', 'https://i.imgur.com/FWz9l1C.png'],
          ['Saxony', 'https://i.imgur.com/HN6zfXR.png'],
        ],
        commanders: [
          ['Gustavus Adolphus', 'https://i.imgur.com/FWz9l1C.png'],
          ['Gustav Horn', 'https://i.imgur.com/FWz9l1C.png'],
          ['Johan Baner', 'https://i.imgur.com/FWz9l1C.png'],
          ['Lennart Torstensson', 'https://i.imgur.com/FWz9l1C.png'],
          ['John George I', 'https://i.imgur.com/HN6zfXR.png'],
          ['Hans Georg von Arnim', 'https://i.imgur.com/HN6zfXR.png'],
        ],
        strength: { number: 39000, guns: 56 },
        casualties: '5,100 killed',
      }),
    },
    {
      name: 'Lutzen',
      location: 'Lutzen, Germany',
      prelude:
        "Gustavus Adolphus's victories at Breitenfeld in 1631, and Rain in 1632, drew him deep into Southern Germany where a Swedish attack on the imperial camp outside the city of Furth was bloodily repulsed by Albrecht von Wallenstein's imperial army. The Swedes later made contact with Wallenstein's troops at Halle, then at a stream 5-6 kilometres south of the city of Lutzen. Wallenstein requested reinforcements while the Swedes camped 2 kilometres outside the town. Imperial troops worked through the night building defensive positions.",
      description:
        'The first part of the battle featured a series of frontal attacks by the Swedes, which nearly succeeded before it was repulsed by a cavalry charge led by Pappenheim. While trying to reform his shattered infantry, Gustavus was killed in a skirmish with Imperial troops. His subordinates rallied their men and, supported by close range artillery fire, overran the Imperial centre just before nightfall. Wallenstein withdrew in good order but had to abandon his wounded, many of his guns and most of his supply train. Despite the loss of their king, the Swedes continued the war under the direction of Axel Oxenstierna. The Swedes and their German allies would go on to form the Heilbronn League in April 1633.',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Death_of_King_Gustav_II_Adolf_of_Sweden_at_the_Battle_of_L%C3%BCtzen_%28Carl_Wahlbom%29_-_Nationalmuseum_-_18031.tif/lossy-page1-1280px-Death_of_King_Gustav_II_Adolf_of_Sweden_at_the_Battle_of_L%C3%BCtzen_%28Carl_Wahlbom%29_-_Nationalmuseum_-_18031.tif.jpg',
      video_url: 'https://www.youtube.com/embed/gvbM9xO5LWI',
      result: 'Swedish anti-imperial victory',
      date: '1632/11/16',
      latitude: 51.25,
      longitude: 12.133333,
      army_one: JSON.stringify({
        beligerents: [
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
          ['Catholic League', 'https://i.imgur.com/ZCgBFLP.png'],
        ],
        commanders: [
          ['Albrecht von Wallenstein', 'https://i.imgur.com/zg6kPGq.png'],
          ['Graf von Pappenheim', 'https://i.imgur.com/zg6kPGq.png'],
          ['Heinrich Holk', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 19175, guns: 43 },
        casualties: '5,160 killed, wounded or Captured.',
      }),
      army_two: JSON.stringify({
        beligerents: [
          ['Sweden', 'https://i.imgur.com/FWz9l1C.png'],
          ['Saxony', 'https://i.imgur.com/HN6zfXR.png'],
          ['Hesse-Kassel', 'https://i.imgur.com/Bjss5NF.png'],
        ],
        commanders: [
          ['Gustavus Adolphus', 'https://i.imgur.com/FWz9l1C.png'],
          ['Bernard of Saxe-Weimar', 'https://i.imgur.com/FWz9l1C.png'],
          ['Dodo van Knyphausen', 'https://i.imgur.com/FWz9l1C.png'],
        ],
        strength: { number: 18738, guns: 60 },
        casualties: '6000 killed or wounded',
      }),
    },
    {
      name: 'Rocroi',
      location: 'Rocroi, France',
      prelude:
        'A string of recent protestant defeats led France to intervene on the side of the protestants and declare war on the Habsburgs (Holy Roman Empire), and Spanish empire on 19th May 1635, to limit Habsburg power. This was despite France being a Catholic power which suppressed its own Protestant rebellions. An initial invasion of the Spanish netherlands ended in failure, with the French retreating to their borders. The peace of Prague in 1935 also saw most of the rebellious German protestant states exit the war. A further French defeat at the Battle of Honnecourt in 1642 opened the way to Paris, Spanish troops under Francisco de melo laid siege to the fortified French of Rocroi. 21 year old Louis de Bourbon, Prince of Condé, was appointed to stop him',
      description:
        "The battle began with a French cavalry attack which pushed back and scattered the opposing Spanish cavalry. An unauthorised French cavalry atack on the Spanish was repulsed, with the Spanish mounting a counter-attack which was later stopped by the French. Condé's cavalry managed to encircle the Spanish and crashed through their rear, scattering the Spanish cavalry and artillery crews. The trapped and encircled Spanish infantry held their ground and were pummeled by French artillery and captured Spanish guns. Impressed with the bravery of the Spanish troops, Condé offered the option of surrender, which the Spanish accepted. However, upon riding toward the Spanish troops to accept their surrender, confused Spanish troops opened fire on the prince, who was able to retreat. French forces responded with a devastating attack in whch the Spanish army was virtually destroyed.",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/9/9f/Rocroi.jpg',
      video_url: 'https://www.youtube.com/embed/zamiibdAyfw',
      result: 'French victory',
      date: '1643/05/19',
      latitude: 49.919444,
      longitude: 4.527778,
      army_one: JSON.stringify({
        beligerents: [['Spanish Empire', 'https://i.imgur.com/aGJkxBf.png']],
        commanders: [
          ['Francisco de Melo', 'https://i.imgur.com/aGJkxBf.png'],
          ['Duque de Alburquerque', 'https://i.imgur.com/aGJkxBf.png'],
          ['Condé Fontana', 'https://i.imgur.com/aGJkxBf.png'],
          ['Graf von Isenburg', 'https://i.imgur.com/aGJkxBf.png'],
        ],
        strength: { number: 27000, guns: 18 },
        casualties: '8,000 killed or wounded, 7000 captured',
      }),
      army_two: JSON.stringify({
        beligerents: [['Kingdom of France', 'https://i.imgur.com/YQXUCFz.png']],
        commanders: [
          ['Louis prince de Condé', 'https://i.imgur.com/YQXUCFz.png'],
          [' Marquis de La Ferte', 'https://i.imgur.com/YQXUCFz.png'],
          ["Marquis d'Espenan", 'https://i.imgur.com/YQXUCFz.png'],
          ['Comte de Gassion', 'https://i.imgur.com/YQXUCFz.png'],
        ],
        strength: { number: 23000, guns: 14 },
        casualties: '4000 killed or wounded',
      }),
    },
    {
      name: 'Freiburg',
      location: 'Freiburg, Germany',
      prelude:
        "After Breitenfeld, the French suffered a considerable defeat in 1643, at the battle of Tuttlingen against Bavarian, imperial and Spanish troops led by Franz von mercy and Johanne Von Werth.The French army was ambushed and destroyed, with casualties of 11,000 men killed or wounded. The French were forced to recall Field Marshal Viscomte (viscount) De Turenne to handle the war in Germany. The Duke of Bavaria decided to capitalise on the weakened French situation by sending Von Mercy and his troops towards Turenne, near Freiburg. Von Mercy's larger and organised force forced the French Garrison to hand over the city. Louis de Condé was dispatched with an army to protect and/or retake the city",
      description:
        "The 3rd of August saw an attempted two-pronged French attack, with Turenne attempting a flanking attack an Louis Condé attempting a frontal atack. The French suffered heavy casualties and both attacks were halted due to rain, nightfall and Bavarian resistance. The 5th of August saw the French lose approximately half their army due to repeated waves of uncoordinated attacks, capitalised on by Von Mercy's forces. The 9th of August saw the French try to cut off Bavarian supplies, however they were outmaneuvered by Von mercy who had already secretly relocated his main army to secure supplies and ammunition. The Bavarians were able to perform a successful fighting retreat to Villingen, without losing many casualties.",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/H._Grobet_-_Cond%C3%A9_%C3%A0_la_bataille_de_Fribourg-en-Brisgau_%281644%29.jpg/1024px-H._Grobet_-_Cond%C3%A9_%C3%A0_la_bataille_de_Fribourg-en-Brisgau_%281644%29.jpg',
      video_url: 'https://www.youtube.com/embed/nDTjr2UjLl0',
      result: 'Disputed',
      date: '1644/08/03',
      start_date: '1644/08/03',
      end_date: '1644/08/09',
      latitude: 47.9955,
      longitude: 7.8522,
      army_one: JSON.stringify({
        beligerents: [
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
          ['Electorate of Bavaria', 'https://i.imgur.com/NIAPLwO.png'],
        ],
        commanders: [['Franz von Mercy', 'https://i.imgur.com/NIAPLwO.png']],
        strength: { number: 16800, guns: 20 },
        casualties: '2500-6800 killed or wounded',
      }),
      army_two: JSON.stringify({
        beligerents: [['Kingdom of France', 'https://i.imgur.com/YQXUCFz.png']],
        commanders: [
          ['Louis prince de Condé', 'https://i.imgur.com/YQXUCFz.png'],
          ['Vicomte de Turenne', 'https://i.imgur.com/YQXUCFz.png'],
        ],
        strength: { number: 20000, guns: 37 },
        casualties: '5000-8000 killed or wounded',
      }),
    },
    {
      name: 'Jankau',
      location: 'Jankau, Bohemia',
      prelude:
        "With the 1635 Treaty of Prague, most of Sweden's protestant German allies made peace. The war lost much of its religious aspect, and turned into a contest between the Holy Roman Empire, and the Swedish Empire supported by France and others. The Danes also re-enetered the war as an imperial ally. THe swedes, led by Lennart Torstensson began plans for an offensive wich would force Ferdinand III, Holy Roman Emperor, to agree to peace terms. While France attacked Bavaria, Torstensson would move into Bohemia then strike at the Imperial capital at Vienna.",
      description:
        "The morning of the battle saw a Swedish army column under Scotsman Robert Douglas attempt a diversionary attack against the Imperial army's right. After leaving to assess this Swedish move, Imperial commander Von Hatzfeldt found that his subordinate Von Gotzen, had misinterpreted his orders while he had gone, moving his entire force to a hill and getting stuck in the woods, giving the Swedes time to place artillery guns and infantry near them. After a furious argument, von Gotzen launched numerous attacks at the Swedes, which were repulsed with heavy losses, until he himself was killed and his troops retreated. Hatzfeld held his position until nightfall, prompting Torstensson to move his artillery closer and fire at close range at the helpless Imperial infantry. Von Werth's Imperial cavalry charged and scattered the Swedish right, before stopping to loot the Swedish baggage train, where they also captured Torstensson's wife. The Swedish cavalry regrouped and counter-attacked the distracted Imperials, inflicting heavy casualties. The isolated Imperial infantry surrendered, many prisoners were taken, including Imperial commander Von Hatzfeldt.",
      image_url: 'https://i.imgur.com/Oi5xDdV.jpg',
      video_url: 'https://www.youtube.com/embed/tPfrVjZ-X60',
      result: 'Swedish anti-imperial victory',
      date: '1645/03/06',
      latitude: 49.6503,
      longitude: 14.7294,
      army_one: JSON.stringify({
        beligerents: [['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png']],
        commanders: [
          ['Von Hatzfeldt', 'https://i.imgur.com/zg6kPGq.png'],
          ['Von Werth', 'https://i.imgur.com/NIAPLwO.png'],
          ['Von Gotzen', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 16000, guns: 26 },
        casualties: '4,000 killed or wounded, 4,450 captured',
      }),
      army_two: JSON.stringify({
        beligerents: [['Swedish Empire', 'https://i.imgur.com/FWz9l1C.png']],
        commanders: [
          ['Lennart Torstensson', 'https://i.imgur.com/FWz9l1C.png'],
          ['Arvid Wittenberg', 'https://i.imgur.com/FWz9l1C.png'],
          ['Mortaigne de Potelles', 'https://i.imgur.com/FWz9l1C.png'],
          ['Robert Douglas', 'https://i.imgur.com/a6fwxWi.png'],
        ],
        strength: { number: 16000, guns: 60 },
        casualties: '3,000-4,000 killed or wounded',
      }),
    },
    {
      name: 'Nordlingen',
      location: 'Alerheim, Germany',
      prelude:
        " Upon reaching Kassel on July 1st, and managing to immediately insult his allied German commander Johann von Geyso, Louis II prince of Condé and the allied army moved to interrupt the Bavarians led by Von Mercy, who were besieging the strategically significant Hessian stronghold of Kirchheim to block off the french army in the area. The french approach forced them to break the siege, both armies then raced towards Heilbronn, with Condé's force arriving first and taking WImpfen. Both armies continued to the east,with Condé taking another city. Condé then turned south to threaten Bavaria, attempting to besiege DInkelsbuhl. Constant Bavarian cavalry raids forced Condé to attempt a direct attack on Von Mercy's bavarian army, but as the area was nt suited for a battle, the French troops marched towards Nordlingen, shadowed by von Mercy ",
      description:
        "An impatient Condé ordered the attack to start at 5PM, ignoring commander Turenne's advice to wait till dawn. The french center approached with their artillery guns towards the Bavarians, and were immediately devestated by artillery fire once in range. They were able to push through and capture a village, but were counter attacked by Mercy's men and artillery fire, ultimately causing them to route. A further attack with a smaller group, led by Condé himself, was shattered before reaching the enemy. By 7pm, most of the french center was destroyed. Von Mercy, on the verge of his greatest victory and ecstatic at the progress of the battle, was killed by a wayward cannonball. His second-in command failed to take control and destroy the french. The lack of coordination and overall strategy following Mercy's death led to french forces destroying the bavarian left and then pouncing on the disorganised center, triggering a general rout.",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Nordlingen.jpg/1024px-Nordlingen.jpg',
      video_url: 'https://www.youtube.com/embed/c0O6CRQiChA',
      result: 'French victory',
      date: '1645/08/03',
      latitude: 48.805556,
      longitude: 10.485833,
      army_one: JSON.stringify({
        beligerents: [
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
          ['Electorate of Bavaria', 'https://i.imgur.com/NIAPLwO.png'],
        ],
        commanders: [
          ['Franz von Mercy', 'https://i.imgur.com/NIAPLwO.png'],
          ['Johann von Werth', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        strength: { number: 16000, guns: 28 },
        casualties: '2,500 killed and wounded, 1,500 captured',
      }),
      army_two: JSON.stringify({
        beligerents: [
          ['Kingdom of France', 'https://i.imgur.com/YQXUCFz.png'],
          ['Hesse-Kassel', 'https://i.imgur.com/Bjss5NF.png'],
        ],
        commanders: [
          ['Louis prince de Condé', 'https://i.imgur.com/YQXUCFz.png'],
          ['Vicomte de Turenne', 'https://i.imgur.com/YQXUCFz.png'],
          ['Johann von Geyso', 'https://i.imgur.com/Bjss5NF.png'],
        ],
        strength: { number: 17000, guns: 27 },
        casualties: '4000 killed or wounded',
      }),
    },
    {
      name: 'Zusmarshausen',
      location: 'Zusmarshausen, Germany',
      prelude:
        'By the late 1640s all the belligerents in the Thirty Years War were exhausted by three decades of brutal fighting. Delegates had convened in the Westphalian cities of Munster and Osnabruck to negotiate a peace treaty in 1646. While these peace talks were in progress, the opposing powers continued to jockey for position in order to improve their positions in the negotiations. Sweden was keen for a final decisive victory against the Habsburg monarchy in order to gain territory inside the Habsburg monarchy, and also to make the most of the war while it lasted by invading and plundering the rich Habsburg province of Bohemia, left relatively untouched by fighting so far',
      description:
        "The battle began at 7, when Montecuccoli's troops in Zusmarshausen came under attack from the Swedish vanguard. Montecuccoli held off the Swedish attacks for an hour before ordering his men to pull back eastward to the village of Herpfenried, where they mounted another stand. This time, however, a group of French cavalry managed to work their way round the southern side of Montecuccoli's position, threatening to cut him off from the rest of the Imperial-Bavarian army. Melander himself dashed back to rescue the rearguard, and in the resulting melee the general was shot in the chest and killed. Montecuccoli managed to extract his surviving men and rejoin Gronsfeld and the rest of the army. Under cover of darkness, Gronsfeld and the imperial forces retreated to Augsburg,,",
      image_url:
        'https://i.pinimg.com/originals/eb/5d/2a/eb5d2a4c4ea50a59b442cc617dd3442e.jpg',
      video_url: 'https://www.youtube.com/embed/7aDHH9Ot-Cw',
      result: 'Franco-Swedish victory',
      date: '1648/05/17',
      latitude: 48.4002,
      longitude: 10.5967,
      army_one: JSON.stringify({
        beligerents: [
          ['Electorate of Bavaria', 'https://i.imgur.com/NIAPLwO.png'],
          ['Holy Roman Empire', 'https://i.imgur.com/zg6kPGq.png'],
        ],
        commanders: [
          ['Peter Melander von Holzappel', 'https://i.imgur.com/zg6kPGq.png'],
          ['Raimondo Montecuccoli', 'https://i.imgur.com/zg6kPGq.png'],
          [
            'Jost Maximilian von Bronckhorst-Gronsfeld',
            'https://i.imgur.com/NIAPLwO.png',
          ],
        ],
        strength: { number: 15370, guns: 0 },
        casualties: '1,897 killed or wounded',
      }),
      army_two: JSON.stringify({
        beligerents: [
          ['Swedish Empire', 'https://i.imgur.com/FWz9l1C.png'],
          ['Kingdom of France', 'https://i.imgur.com/YQXUCFz.png'],
        ],
        commanders: [
          ['Vicomte de Turenne', 'https://i.imgur.com/YQXUCFz.png'],
          ['Carl Gustaf Wrangel', 'https://i.imgur.com/FWz9l1C.png'],
        ],
        strength: { number: 22000, guns: 0 },
        casualties: 'More than 500 killed or wounded',
      }),
    },
    {
      name: 'Lens',
      location: 'Spanish Netherlands',
      prelude:
        "Over the four years following the decisive French victory at Rocroi against the Spanish Army of Flanders, the French captured dozens of towns throughout northern France and the Spanish Netherlands. Archduke Leopold Wilhelm was appointed governor of the Spanish Netherlands in 1647 to strengthen Spain's Habsburg alliance with Austria, and began a major counteroffensive the same year. The Spanish army first found success recapturing the fortresses of Armentières, Comines and Landrecies.\n The Prince de Condé was recalled from a failed campaign in Catalonia against the Spanish and appointed commander of the 16,000-man French army opposite the Spanish army of the Archduke and General Jean de Beck, the governor of Luxembourg. Condé captured Ypres but then the 18,000-strong Spanish-German force laid siege to Lens. Condé advanced to meet them.",
      description:
        'In the battle that ensued, Condé provoked the Spanish into giving up a strong hilltop position for an open plain, where he used the discipline and superior close-combat capabilities of his cavalry to charge and rout the Walloon-Lorrainer cavalry on the Spanish wings. The French infantry and cavalry in the center were attacked by the strong Spanish center, suffering heavy losses but holding their ground. The French cavalry on the wings, freed from any opposition, encircled and charged the Spanish center, who promptly surrendered. The French victory contributed to the signing of the Peace of Westphalia but the outbreak of the Fronde rebellion prevented the French from exploiting their victory to the hilt against the Spanish.',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pierre_Franque_-_Bataille_de_Lens_-_1648.jpg/1024px-Pierre_Franque_-_Bataille_de_Lens_-_1648.jpg',
      video_url: 'https://www.youtube.com/embed/gmAg7t6oqEc',
      result: 'French Victory',
      date: '1648/08/20',
      latitude: 50.416667,
      longitude: 2.833333,
      army_one: JSON.stringify({
        beligerents: [['Kingdom of Spain', 'https://i.imgur.com/aGJkxBf.png']],
        commanders: [
          ['Archduke Leopold Wilhelm', 'https://i.imgur.com/aGJkxBf.png'],
          ['Jean de Beck', 'https://i.imgur.com/aGJkxBf.png'],
        ],
        strength: { number: 18000, guns: 38 },
        casualties: '8000 killed or captured',
      }),
      army_two: JSON.stringify({
        beligerents: [['Kingdom of France', 'https://i.imgur.com/YQXUCFz.png']],
        commanders: [
          ['Louis prince de Condé', 'https://i.imgur.com/YQXUCFz.png'],
        ],
        strength: { number: 16000, guns: 18 },
        casualties: '1,500 killed or wounded',
      }),
    },
    {
      name: 'Prague',
      location: 'Prague, Bohemia',
      prelude:
        'While the negotiations for the Peace of Westphalia were proceeding, the Swedes took the opportunity to mount one last campaign into Bohemia. The main result, and probably the main aim, was to loot the fabulous art collection assembled in Prague Castle by Rudolf II, Holy Roman Emperor (1552-1612), the pick of which was to be taken down the Elbe in barges and shipped to Sweden.',
      description:
        "The Swedes entered the city, defended by the Governor Feldmarschall Rudolf von Colloredo, a veteran of the siege of Mantua and of the battle of Lutzen, where he served under Albrecht von Wallenstein. A sudden night raid saw the swedes conquer the western bank of the Vltava river - i.e. Prague Castle and quarters Hradčany and Lesser Town - and completely looted those rich districts. Their attempt to enter the old town was repulsed on the Charles Bridge by Colloredo's men. A three-pronged third Swedish army attack against the city was fiercely resisted, with help from the burghers' militia and student voluntary troops under Czech Jesuit priest Jiří Plachý and German jurist Hans Georg Kauffer. The Swedes settled for looting the castle and surrounding palaces and monasteries.",
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Battle_on_Charles_Bridge_-_1648.jpg/1280px-Battle_on_Charles_Bridge_-_1648.jpg',
      video_url: 'https://www.youtube.com/embed/gmAg7t6oqEc',
      result: 'Disputed',
      start_date: '1648/07/25',
      end_date: '1648/11/01',
      latitude: 50.086389,
      longitude: 14.412222,
      army_one: JSON.stringify({
        beligerents: [['Swedish Empire', 'https://i.imgur.com/FWz9l1C.png']],
        commanders: [
          ['Hans Christoff von Königsmarck', 'https://i.imgur.com/FWz9l1C.png'],
          ['Prince Carl Gustaf', 'https://i.imgur.com/FWz9l1C.png'],
          ['Arvid Wittenberg', 'https://i.imgur.com/FWz9l1C.png'],
        ],
        strength: { number: 13500, guns: 0 },
        casualties: '500 killed, 700 wounded',
      }),
      army_two: JSON.stringify({
        beligerents: [['Bohemia', 'https://i.imgur.com/ambnSQo.png']],
        commanders: [
          ['Count Rudolph Colloredo', 'https://i.imgur.com/ambnSQo.png'],
          ['Jiří Plachý', 'https://i.imgur.com/ambnSQo.png'],
          ['Hans Georg Kauffer', 'https://i.imgur.com/ambnSQo.png'],
        ],
        strength: { number: 2000, guns: 0 },
        casualties: '219 killed, 475 wounded',
      }),
    },
  ];

  console.log('Seed start');
  await db.insert(battlesTable).values(data);
  console.log('Seed done');
};

main();
