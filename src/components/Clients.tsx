// import { stats } from "@/data/stats"

// const Stats: React.FC = () => {
//     return (
//         <section id="stats" className="py-10 lg:py-20">
//             <div className="grid sm:grid-cols-3 gap-8">
//                 {stats.map(stat => (
//                     <div key={stat.title} className="text-center sm:text-left max-w-md sm:max-w-full mx-auto">
//                         <h3 className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
//                             {stat.icon}
//                             {stat.title}
//                         </h3>
//                         <p className="text-foreground-accent">{stat.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

// export default Stats

import Image from "next/image";
import { clients } from "@/data/clients";

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-10 lg:py-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        How Our Clients Display Their Art
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <Image
              src={client.image}
              alt={client.alt}
              className="object-cover w-full h-full"
              placeholder="blur"
              blurDataURL={client.image.blurDataURL} // Next auto-generates
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
