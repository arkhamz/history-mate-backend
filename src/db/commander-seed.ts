import { commandersTable } from './schema';
import { config } from 'dotenv';
import { db } from '.';

config({ path: '.env' });

if (!('DATABASE_URL' in process.env))
  throw new Error('DATABASE_URL not found on .env.development');

const main = async () => {
  const data: (typeof commandersTable.$inferInsert)[] = [
    {
      full_name: 'Christian IV of Denmark',
      title: 'King of Denmark and Norway, Duke of Holstein and Schleswig',
      loyalty: 'Denmark-Norway',
      loyalty_image_url: 'https://i.imgur.com/FQeo5f8.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Christian_IV_Pieter_Isaacsz_1612.jpg/800px-Christian_IV_Pieter_Isaacsz_1612.jpg',
      birth_date: '1577/04/12 ',
      death_date: '1648/02/28',
      birth_location: 'Frederiksborg Palace, Denmark',
      bio: "Christian IV had obtained for his kingdom a level of stability and wealth that was virtually unmatched elsewhere in Europe. Denmark's intervention in the Thirty Years' War was aided by France and by Charles I of England, who agreed to help subsidise the war partly because Christian was the uncle of both the Stuart king and his sister Elizabeth of Bohemia through their mother, Anne of Denmark. Some 13,700 Scottish soldiers were to be sent as allies to help Christian IV under the command of General Robert Maxwell, 1st Earl of Nithsdale.[25] Moreover, some 6000 English troops under Sir Charles Morgan also eventually arrived to bolster the defence of Denmark though it took longer for these to arrive than Christian hoped, not least due to the ongoing British campaigns against France and Spain. The urgent solicitations of other powers, and his fear that Gustavus Adolphus should supplant him as the champion of the Protestant cause, finally led him to enter the war on 9 May 1625. Thus Christian, as war-leader of the Lower Saxon Circle, entered the war with an army of only 20,000 mercenaries, some of his allies from Britain and a national army 15,000 strong, leading them as Duke of Holstein rather than as King of Denmark.",
    },
    {
      full_name: 'Gustavus Adolphus',
      title: 'King of Sweden',
      loyalty: 'Kingdom  of Sweden',
      loyalty_image_url: 'https://i.imgur.com/FWz9l1C.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Attributed_to_Jacob_Hoefnagel_-_Gustavus_Adolphus%2C_King_of_Sweden_1611-1632_-_Google_Art_Project.jpg/800px-Attributed_to_Jacob_Hoefnagel_-_Gustavus_Adolphus%2C_King_of_Sweden_1611-1632_-_Google_Art_Project.jpg',
      birth_date: '1594/12/09',
      death_date: '1632/11/06',
      birth_location: 'Castle Tre Kronor, Sweden',
      bio: "Gustavus Adolphus inherited three wars from his father when he ascended the throne: against Denmark-Norway, which had attacked Sweden earlier in 1611; against Russia, due to Sweden having tried to take advantage of the Russian Time of Troubles; and against Poland-Lithuania, due to King Charles's having deposed King Sigismund III, his nephew, as King of Sweden. The war against Denmark-Norway (Kalmar War) was concluded in 1613 with a peace that did not cost Sweden any territory, but it was forced to pay a heavy indemnity to Denmark-Norway (Treaty of Knäred). The war against Russia (Ingrian War) ended in 1617 with the Treaty of Stolbovo, which excluded Russia from the Baltic Sea. The final inherited war, the war against Poland, ended in 1629 with the Truce of Altmark, which transferred the large province of Livonia to Sweden and freed the Swedish forces for the subsequent intervention in the Thirty Years' War in Germany. Gustavus Adolphus intervened on the anti-Imperial side, which at the time was losing to the Holy Roman Empire and its Catholic allies. ",
    },
    {
      full_name: 'Lennart Torstensson',
      title: 'Field marshal, Count of Ortala, Baron of Virestad',
      loyalty: 'Kingdom of Sweden',
      loyalty_image_url: 'https://i.imgur.com/FWz9l1C.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lennart_Torstenson%2C_1603-51_-_Nationalmuseum_-_40308.tif/lossy-page1-800px-Lennart_Torstenson%2C_1603-51_-_Nationalmuseum_-_40308.tif.jpg',
      birth_date: '1603/08/17',
      death_date: '1651/04/07',
      birth_location: 'Vastergotland, Sweden',
      bio: "A long-time assistant and confidant to the young king Gustavus Adolphus, observing battles such as those of the Livonian war alongside Gustavus. It is told that at one battle Gustavus Adolphus sent Torstensson with an order to one of the officers. On his way Torstensson noticed that the enemy had changed position and altered the King's orders. Gustavus noticed the new development. When Torstensson returned he told Gustavus what he had done. The King first raised his hand as if to strike Torstensson but changed his mind and said, 'Lennart, this could have cost you your life, but maybe you are better suited to be a general than a page at the royal court '. Shortly thereafter, in 1629 Torstensson was put in charge of the Swedish artillery, which under his guidance contributed greatly to the victories of Breitenfeld and Lech",
    },
    {
      full_name: 'Louis II de Bourbon',
      title: 'Prince of Condé ',
      loyalty: 'Kingdom of France',
      loyalty_image_url: 'https://i.imgur.com/YQXUCFz.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Louis%2C_Grand_Cond%C3%A9.PNG/800px-Louis%2C_Grand_Cond%C3%A9.PNG',
      birth_date: '1621/09/08',
      death_date: '1686/12/11',
      birth_location: 'Paris, France',
      bio: "Louis was born in Paris, the son of Henri II de Bourbon, Prince of Condé and Charlotte Marguerite de Montmorency; the infant was immediately endowed with the title of Duke of Enghien, a title pertaining to the House of Condé. His father was a first cousin-once-removed of Henry IV, the King of France, and his mother was an heiress of one of France's leading ducal families. In 1643 Enghien was appointed to command against the Spanish in northern France. He was opposed by Francisco de Melo, and the tercios of the Spanish army who were held to be the toughest soldiers in Europe. ",
    },
    {
      full_name: "Henri de La Tour d'Auvergne",
      title: 'Viscount of Turenne',
      loyalty: 'Kingdom of France',
      loyalty_image_url: 'https://i.imgur.com/YQXUCFz.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Henri_de_la_Tour_d%27Auvergne%2C_Vicomte_de_Turenne_by_Circle_of_Philippe_de_Champaigne.jpg/800px-Henri_de_la_Tour_d%27Auvergne%2C_Vicomte_de_Turenne_by_Circle_of_Philippe_de_Champaigne.jpg',
      birth_date: '1611/09/11',
      death_date: '1675/07/27',
      birth_location: 'Sedan, France',
      bio: "Henri was a son of the Protestant Henri, duc de Bouillon, by his second wife, Elizabeth of Nassau, daughter of William the Silent, the stadholder of the Netherlands. When his father death_date in 1623, Turenne was sent to learn soldiering with his mother's brothers, Maurice and Frederick Henry, the princes of Orange who were leading the Dutch against the Spaniards in the Netherlands. Though he was given command of an infantry regiment in the French service for the campaign of 1630, he was back with Frederick Henry in 1632. In 1635, however, when Louis XIII's minister Cardinal de Richelieu brought France into open war against the Habsburgs & Holy Roman Empire, Turenne, with the rank of maréchal de camp, or brigadier, went to serve under Cardinal de La Valette (Louis de Nogaret) on the Rhine. He was a hero of a retreat from Mainz to Metz and was wounded in the assault on Saverne in July 1636. After a mission to Liège to hire troops for the French, he was sent to the Rhine again in 1638 to reinforce Bernhard of Saxe-Weimar at the siege of Breisach; he conducted the assault and won the respect of Bernhard's German troops. Two campaigns fought in Italy, culminating in the capture of Turin on Sept. 17, 1640, confirmed his reputation.",
    },
    {
      full_name: 'Peter Ernst Mansfeld',
      title: 'Count of Mansfeld',
      loyalty: 'Anti-imperialist',
      loyalty_image_url: 'https://i.imgur.com/EUhXyJs.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/6/61/PeterErnstIIofMansfield02.jpg',
      birth_date: '1580/01/01',
      death_date: '1626/11/29',
      birth_location: 'Luxembourg, Spanish Netherlands',
      bio: "Mansfeld was an illegitimate son of Count Peter Ernst von Mansfeld (1517-1604),[2] a member of the comital House of Mansfeld and royal Spanish stadtholder. He was raised in the Catholic faith at his father's palace in Luxembourg. He gained his earliest military experiences during the Long War in Hungary, where his elder half-brother Charles (1543-1595), also a soldier of renown, held a high command in the imperial army. While his brother succumbed to an epidemic within short time, young Ernst stayed at the theatre of war for several years. In the War of the Jülich Succession he served under Archduke Leopold V of Austria, until that prince's perceived ingratitude drove him into the arms of the enemies of the House of Habsburg. Although he remained a Roman Catholic, from about 1610 he openly allied himself with the Protestant princes, and during the earlier part of the Thirty Years' War he was one of their foremost champions",
    },
    {
      full_name: 'Ferdinand II',
      title: 'Holy Roman Emperor',
      loyalty: 'Holy Roman Empire',
      loyalty_image_url: 'https://i.imgur.com/zg6kPGq.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Portrait_of_Ferdinand_II%2C_Holy_Roman_Emperor_%28Kunsthistorisches_Museum%2C_Wien%29.jpg/800px-Portrait_of_Ferdinand_II%2C_Holy_Roman_Emperor_%28Kunsthistorisches_Museum%2C_Wien%29.jpg',
      birth_date: '1578/07/09',
      death_date: '1637/02/15',
      birth_location: 'Styria, Austria',
      bio: "Ferdinand was born in Graz, the eldest son of the archduke Charles, the ruler of Inner Austria (Styria, Carinthia, and Carniola), and Maria, a daughter of Albrecht V, duke of Bavaria. From 1590 to 1595 he was educated at the University of Ingolstadt by Jesuits whose aim was to make him a strict, rigidly Catholic ruler. In 1596 he took over his hereditary lands and, after a pilgrimage to Loreto and Rome, set about suppressing Protestantism by forcing the great majority of his subjects to adopt the Roman Catholic faith. In 1617 , Ferdinand was recognized by the Bohemian Diet as king of Bohemia and in 1618 was elected king of Hungary. In 1619, however, the largely Protestant diet of Bohemia deposed him, electing calvinist Frederick V, elector of the Palatinate, as their king. This was, in effect, the beginning of the Thirty Years' War. Ferdinand II was the leading champion of the Roman Catholic Counter-Reformation and of absolutist rule during the Thirty Years’ War. As a zealous Catholic, Ferdinand wanted to restore the Catholic Church as the only religion in the Empire and to wipe out any form of religious dissent.",
    },
    {
      full_name: 'Albrecht von Wallenstein',
      title: 'Duke of Friedland, Supreme commander of the Imperial army',
      loyalty: 'Holy Roman Empire',
      loyalty_image_url: 'https://i.imgur.com/zg6kPGq.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Albrecht_von_Wallenstein.jpeg/800px-Albrecht_von_Wallenstein.jpeg',
      birth_date: '1583/09/24',
      death_date: '1634/02/25',
      birth_location: 'Hermanice, Bohemia',
      bio: "Wallenstein was born in the Kingdom of Bohemia into a poor Protestant noble family. He acquired a multilingual university education across Europe and converted to Catholicism in 1606. A marriage in 1609 to the wealthy widow of a Bohemian landowner gave him access to considerable estates and wealth after her death at an early age in 1614. Three years later, Wallenstein embarked on a career as a mercenary by raising forces for the Holy Roman Emperor in the Uskok War against the Republic of Venice. Wallenstein fought for the Catholics in the Protestant Bohemian Revolt of 1618 and was awarded estates confiscated from the rebels after their defeat at White Mountain in 1620. A series of military victories against the Protestants raised Wallenstein's reputation in the Imperial court and in 1625 he raised a large army of 50,000 men to further the Imperial cause. ",
    },
    {
      full_name: 'Johan Tserclaes',
      title: 'Count of Tilly',
      loyalty: 'Kingdom of Spain',
      loyalty_image_url: 'https://i.imgur.com/aGJkxBf.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Johann_Tserclaes_Tilly.jpg/800px-Johann_Tserclaes_Tilly.jpg',
      birth_date: '1559/02/01',
      death_date: '1632/04/30',
      birth_location: 'Castle Tilly, Brabant - Spanish Netherlands',
      bio: "Johann Tserclaes was born in February 1559 in Castle Tilly, Walloon Brabant, in the Spanish Netherlands. Johann Tserclaes was born into a devoutly Roman Catholic Brabantine family. Educated by Jesuits, Tilly gained military experience in the Spanish Army of Flanders fighting the Dutch. In 1594 he joined the army of Holy Roman Emperor Rudolf II in the campaign against the Turks in Hungary, rapidly becoming promoted to field marshal. Appointed by Duke (later Elector) Maximilian I of Bavaria to reorganize the Bavarian army in 1610, Tilly created such an efficient army that it later became the backbone and spearhead of the Catholic League. At the outbreak of the Thirty Years' War (1618), he became commander in chief of the field forces for the Catholic League. In 1620 he conducted the first campaign of the war and, after a series of successes, marched on Prague to rout the troops fighting for Frederick V of the Upper Palatinate, the “Winter King” of Bohemia, at the Battle of White Mountain.",
    },
    {
      full_name: 'Melchior von Hatzefeldt',
      title: 'Imperial field marshall, count of Gleichen and Hatzfeldt',
      loyalty: 'Holy Roman Empire',
      loyalty_image_url: 'https://i.imgur.com/zg6kPGq.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Melchior_von_Hatzfeldt.jpg/800px-Melchior_von_Hatzfeldt.jpg',
      birth_date: '1593/10/20',
      death_date: '1658/01/09',
      birth_location: 'Westerwald, Holy Roman Empire',
      bio: 'From 1625 to 1632 Hatzfeldt campaigned under the imperial generalissimo Albrecht von Wallenstein; he then took part in the conspiracy that toppled Wallenstein (1634), for which the emperor Ferdinand III rewarded him with lands and titles. From 1639 to 1643 he was successful in the secondary Rhenish-Westphalian theatre of war. Against the Swedes, however, he could do little. Johan Banér defeated him at Wittstock (1636), and Lennart Torstenson outfought and captured him at Jankov, Bohemia (1643). He was a remarkably honest and fair commander in an age of unscrupulous mercenary warfare. ',
    },
    {
      full_name: 'Franz Freiherr von Mercy',
      title: 'Lord of Mandre and Collenburg',
      loyalty: 'Holy Roman Empire & Bavaria',
      loyalty_image_url: 'https://i.imgur.com/zg6kPGq.png',
      image_url:
        'https://1.bp.blogspot.com/-tXs25wgaSdQ/YGW87Io2dcI/AAAAAAAADNo/UXjMvK6y3wwSmMYSPjYr-fB8BSOvmTx0QCLcBGAsYHQ/s512/Franz%2Bvon%2BMercy.jpg',
      birth_date: '1597/01/01',
      death_date: '1645/08/03',
      birth_location: 'Longwy, Holy Roman Empire',
      bio: "He entered military service most likely in the army of the Catholic League around the beginning of the Thirty Years' War and changed over to imperial service later on. In 1625 he held the rank of captain in the regiment of Hannibal von Schauenburg and in 1626 he was mentioned as chamberlain of Archduke Leopold V of Tyrol. By 1630 he had attained the rank of Obristwachtmeister (general officer). His defense of Bavaria made him one of the most successful imperial commanders of his time.",
    },
    {
      full_name: 'Johann von Werth',
      title: 'Imperial Lieutenant Field Marshall',
      loyalty: 'Holy Roman Empire',
      loyalty_image_url: 'https://i.imgur.com/zg6kPGq.png',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Johann_von_Werth.jpg/800px-Johann_von_Werth.jpg',
      birth_date: '1591/01/01',
      death_date: '1652/09/12',
      birth_location: 'Büttgen, Duchy of Jülich',
      bio: "Werth was the eldest son of  a farmer, with seven brothers and sisters. Around 1610, he left home to become a soldier of fortune in the Walloon cavalry under Ambrogio Spinola in the Spanish Netherlands. Most likely, he fought in the War of the Jülich Succession and served afterwards in the garrison of Lingen. The outbreak of the Thirty Years' War saw him moving to Bohemia in support of Holy Roman Emperor Ferdinand II. ",
    },
  ];

  console.log('Seed start');
  await db.insert(commandersTable).values(data);
  console.log('Seed done');
};

main();
