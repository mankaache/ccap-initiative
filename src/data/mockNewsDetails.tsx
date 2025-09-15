  import image from "@/assets/vegetation.jpg";

  export const mockNewsDetails =  [
      {
        id: "1",
        title:
          "LOI N°96/12 DU 5 août 1996 PORTANT LOI-CADRE RELATIVE À LA GESTION DE L’ENVIRONNEMENT",
        description:
          "Ce texte juridique fondamental au Cameroun est celui qui fixe les règles générales pour la protection de l'environnement et la gestion durable de ses ressources, et est un patrimoine commun national. ",
        date: "1996-08-5",
        image: image,
        category: "national",
        type: "pdf",
        document: "/art1.pdf",
        content: "",
        author: "Climate News Team",
        source: "MINEDEP",
      },
      {
        id: "2",
        type: "text",
        document: null,
        title: "Cadre institutionnel sur le changement climatique au Cameroun",
        description:
          "L’ONACC crée le 10 déc. 2009, collecter, traiter et diffuser l’information sur l’évolution du Climat ",
        date: "2009-03-11",
        image: image,
        category: "national",
        content: `
      <p>The recent COP29 Climate Summit has marked a significant milestone in international climate cooperation, with world leaders announcing groundbreaking new funding mechanisms designed to accelerate climate action in developing nations.</p>
      
      <p>The summit, held in Dubai, brought together representatives from over 190 countries to discuss innovative approaches to climate finance. Key outcomes include:</p>
      
      <ul>
        <li>A new $100 billion climate adaptation fund specifically for African nations</li>
        <li>Enhanced carbon credit mechanisms to support renewable energy projects</li>
        <li>Streamlined processes for accessing climate finance for small island developing states</li>
        <li>Public-private partnership frameworks for large-scale climate infrastructure</li>
      </ul>
      
      <p>For countries like Cameroon, these new mechanisms represent unprecedented opportunities to scale up climate action initiatives. The enhanced funding pathways will particularly benefit forest conservation projects, renewable energy infrastructure, and climate-resilient agriculture programs.</p>
      
      <p>Dr. Sarah Johnson, lead negotiator for the African Union, emphasized the importance of these developments: "These new funding mechanisms address long-standing barriers that have prevented developing nations from accessing the resources needed for effective climate action."</p>
      
      <p>The implementation of these funding mechanisms is expected to begin in early 2024, with the first disbursements anticipated by mid-year. Countries will need to submit detailed project proposals through the enhanced application processes established by the summit.</p>
    `,
        author: "Climate News Team",
        source: "L’ONACC ",
      },
    ]
