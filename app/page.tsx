"use client";
import { useEffect, useRef, useState } from "react";
import { assetPath } from "../lib/site-path";
import publications from "../lib/publications.json";
import publicationSource from "../lib/publication-source.json";
import photos from "../lib/photography.json";
import { presentations } from "../lib/presentations";
import { InteractiveProjects } from "./interactive-projects";
import { useReadingProgress } from "../lib/use-reading-progress";
const nav = [
  ["about", "About"],
  ["research", "Research"],
  ["publications", "Publications"],
  ["panels", "Interactive"],
  ["talks", "Talks & Posters"],
  ["photography", "Astrophotos"],
  ["cv", "CV"],
  ["contact", "Contact"],
];
const openingLinks = [["about","A little about me"],["research","My research"],["panels","Fun Interactive projects"],["photography","Astrophotos"]];
const sectionIds = nav.map(([id]) => id);
const emailAddress = "penzhu@space.dtu.dk";
const cvFilename = "Pengpei-Zhu-CV.pdf";
const sciXQuery = publicationSource.query;
const sciXUrl = `https://scixplorer.org/search?q=${encodeURIComponent(sciXQuery)}&sort=date%20desc&d=astrophysics`;
const ReadingTrack = ({section}:{section:string}) => <span className="reading-track" data-progress-for={section} aria-hidden="true"><i/></span>;
const SectionTitle = ({section,children}:{section:string,children:React.ReactNode}) => <div className="section-title"><h2 id={`${section}-title`}>{children}</h2><ReadingTrack section={section}/></div>;
const Arrow = ({up=false}:{up?:boolean}) => <span aria-hidden="true">{up?"↗":"→"}</span>;
const External = ({href,children}:{href:string,children:React.ReactNode}) => <a href={href} target="_blank" rel="noreferrer">{children}</a>;
const projects = [
  {id:"stellar-metallicity",meta:"Ongoing · JWST/NIRSpec",label:"Stellar metallicities",title:"The chemical memory of galaxies",question:"What can stars tell us about a galaxy’s formation?",text:"I study the stellar metallicities of massive quiescent galaxies at high redshift. Absorption-line measurements let us connect their enrichment histories with nearby populations studied by SDSS and LEGA-C.",detail:"I develop tools for stellar-population modelling and uncertainty estimation, extracting physical information from faint spectral features. The goal is to connect the chemical record preserved in stars with the histories of galaxy growth and quenching.",note:"With Anna Gallazzi, Stefano Zibetti, Francesco Valentino, and Kei Ito. Stellar-population studies in preparation."},
  {id:"neutral-outflows",meta:"DeepDive · Published 2026",label:"Neutral gas flows",title:"Gas leaving. Gas returning?",question:"How do galaxies remain quiet?",text:"Using sodium absorption in JWST spectra, I investigate neutral gas outflows in distant quiescent galaxies. Their inferred velocities suggest that gas can remain bound and return, offering a window onto how galaxies stay quiet.",detail:"The DeepDive sample connects the motion of neutral gas with the properties of massive galaxies after star formation has declined. These observations help us investigate the role of gas cycling in maintaining quiescence.",url:"https://arxiv.org/abs/2602.17767",link:"Read the DeepDive paper"},
  {id:"post-starburst-galaxies",meta:"SQuIGGLE · Keck/NIRES",label:"Post-starburst galaxies",title:"Cold gas, little star formation",question:"Can a galaxy stop forming stars while retaining its fuel?",text:"My work on gas-rich post-starburst galaxies uses Hα spectroscopy to test their ongoing star formation, connecting the gas reservoir to the process of quenching.",detail:"Within SQuIGGLE, I use Keck/NIRES observations to examine the relationship between molecular gas and star formation after a recent burst. This work investigates why a substantial reservoir of gas does not necessarily imply vigorous ongoing star formation.",url:"https://arxiv.org/abs/2501.16459",link:"Read the SQuIGGLE paper"},
  {id:"spectral-methods",meta:"Methods · VLT/MUSE & archives",label:"Spectra & open catalogues",title:"Making complex spectra interpretable",question:"How can we make the evidence behind a measurement easier to examine?",text:"For my master’s work on NGC 833 and NGC 835, I developed methods to select multicomponent emission-line models using spatial, physical, and statistical information from MUSE datacubes.",detail:"I am now developing an interactive catalogue for my stellar-metallicity study and a DJA-based catalogue of red spiral galaxies at z > 1. These tools link measurements to spectra, model comparisons, diagnostics, and sample-selection information.",note:"Catalogues in development, with structured data and clear provenance for future reuse."}
];
export default function Home(){
 const [menu,setMenu]=useState(false),[filter,setFilter]=useState("selected"),[query,setQuery]=useState(""),[year,setYear]=useState("all"),[notice,setNotice]=useState("");
 const dialog=useRef<HTMLDialogElement>(null),photoDialog=useRef<HTMLDialogElement>(null),menuButton=useRef<HTMLButtonElement>(null);
 const [photoIndex,setPhotoIndex]=useState(0);
 const active=useReadingProgress(sectionIds);
 const photo=photos[photoIndex];
 function openPhoto(index:number){setPhotoIndex(index);photoDialog.current?.showModal()}
 function stepPhoto(direction:number){setPhotoIndex(index=>(index+direction+photos.length)%photos.length)}
 const matches=publications.filter(p=>(filter==="all"||(filter==="selected"&&p.selected)||(filter==="first"&&p.firstAuthor))&&(year==="all"||p.year===year)&&`${p.title} ${p.authors} ${p.journal} ${p.year} ${p.doi} ${p.arxiv} Pengpei Zhu`.toLowerCase().includes(query.toLowerCase().trim())).sort((a,b)=>filter==="selected"?0:a.scixOrder-b.scixOrder);
 useEffect(()=>{if(!notice)return;const timer=setTimeout(()=>setNotice(""),4000);return()=>clearTimeout(timer)},[notice]);
 async function copy(text:string,success:string){try{await navigator.clipboard.writeText(text);setNotice(success)}catch{setNotice("Copy is unavailable here. Select the text, or download the bibliography.")}}
 return <><a className="skip-link" href="#main">Skip to content</a><header className="site-header"><div className="header-inner"><a href="#top" className="wordmark" aria-label="Pengpei Zhu, home"><img className="mark" src={assetPath("/branding/zhu-seal.svg")} alt="" aria-hidden="true" width="42" height="42"/>Pengpei Zhu<span className="wordmark-cn" lang="zh">朱芃佩</span></a><button ref={menuButton} className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" onClick={()=>setMenu(!menu)}>{menu?"Close −":"Menu +"}</button><nav id="main-nav" aria-label="Main navigation" className={menu?"open":""} onKeyDown={e=>{if(e.key==="Escape"){setMenu(false);menuButton.current?.focus()}}}>{openingLinks.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?"location":undefined} onClick={()=>setMenu(false)}>{label}</a>)}</nav></div></header>
 <main id="main">
  <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="hero-main wrap">
      <div>
        <p className="eyebrow hero-eyebrow"><i/>Astrophysics · Cosmic Dawn Center</p>
        <h1 id="hero-title">Pengpei Zhu <span lang="zh">朱芃佩</span></h1>
        <p className="hero-statement">Galaxies, gas &amp; <em>cosmic history.</em></p>
        <p className="hero-description">I study how galaxies grow, enrich their stars, and stop forming new ones — reading their histories through the light they leave behind.</p>
        <nav className="hero-actions" aria-label="Explore my website">
          {openingLinks.map(([id, label]) => (
            <a className="hero-link" key={id} href={`#${id}`}>{label}<Arrow/></a>
          ))}
        </nav>
      </div>
      <div className="hero-aside">
        <div className="institution-marks" aria-label="Affiliations">
          <a href="https://www.space.dtu.dk/" target="_blank" rel="noreferrer" aria-label="DTU Space">
            <img className="dtu-mark" src={assetPath("/branding/dtu-logo.png")}  alt="DTU" width="1951" height="2846"/>
          </a>
          <a href="https://cosmicdawn.dk/" target="_blank" rel="noreferrer" aria-label="Cosmic Dawn Center">
            <img className="dawn-mark" src={assetPath("/branding/dawn-logo.png")}  alt="Cosmic Dawn Center" width="1625" height="375"/>
          </a>
        </div>
        <figure className="portrait">
          <div className="portrait-frame">
            <img src={assetPath("/pengpei-zhu.jpg")}  alt="Pengpei Zhu" width="1024" height="993" fetchPriority="high"/>
            <span aria-hidden="true"/>
          </div>
          <figcaption>
            <span>PhD researcher</span>
            <span>DAWN · DTU Space, Denmark</span>
          </figcaption>
        </figure>
        <address className="hero-contact" aria-label="Email, CV and contact details">
          <a className="hero-email" href={`mailto:${emailAddress}`}>{emailAddress}</a>
          <div className="hero-contact-links">
            <a href={assetPath(`/${cvFilename}`)} download={cvFilename}>Download CV (PDF) <span aria-hidden="true">↓</span></a>
            <a href="#contact">Contact <Arrow/></a>
          </div>
        </address>
      </div>
    </div>
  </section>
  <div className="page-index"><div className="index-inner wrap"><div className="index-contact"><span className="index-label">Contact</span><a href={`mailto:${emailAddress}`}>{emailAddress}</a></div><div><span className="index-label">On this page</span><nav aria-label="On this page">{nav.map(([id,label])=><a key={id} href={`#${id}`} aria-current={active===id?"location":undefined}>{label}<ReadingTrack section={id}/></a>)}</nav></div></div></div>

 <section id="about" data-reading-section className="section about" aria-labelledby="about-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>01</span>About me</p><span className="section-note">A little of my story</span></div><div className="intro-grid"><SectionTitle section="about">Hello, I’m<br/>Pengpei.</SectionTitle><div className="intro-copy"><p className="lead">An astronomer interested in how galaxies grow — and why they stop forming stars.</p><p>I’m Pengpei Zhu <span lang="zh" className="inline-chinese">朱芃佩</span>, a PhD student at the <External href="https://cosmicdawn.dk/staff/pengpei-zhu/">Cosmic Dawn Center, DTU Space</External> in Denmark, supervised by Francesco Valentino. I study galaxy evolution through neutral gas flows, stellar populations, and chemical enrichment.</p><p>My path began at the University of California, Santa Cruz, where I studied physics with an astrophysics focus and philosophy. I then completed a master’s in astronomy at Leiden University before joining DAWN in 2024. Today, I work with JWST, VLT, and Keck spectra to connect the light of galaxies with their physical histories.</p></div></div><ol className="education-strip"><li><span>2017–2022 · Santa Cruz</span><strong>Physics &amp; Philosophy</strong><p>BS &amp; BA · UC Santa Cruz</p></li><li><span>2022–2024 · Leiden</span><strong>Astronomy</strong><p>MSc · Leiden University</p></li><li><span>2024–present · Denmark</span><strong>Astrophysics</strong><p>PhD · Cosmic Dawn Center, DTU</p></li></ol></div></section>
 <section id="research" data-reading-section className="section research" aria-labelledby="research-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>02</span>Research</p><span className="section-note">From spectra to physical histories</span></div><div className="intro-grid"><SectionTitle section="research">Research</SectionTitle><div className="intro-copy"><p className="lead">What makes a galaxy go quiet?</p><p>I connect the motion of gas, the chemistry of stars, and the histories of star formation to understand galaxy evolution and quenching. My work combines spectroscopy with tools that make the evidence easier to explore.</p></div></div><nav className="research-contents" aria-label="Research topics">{projects.map((p,i)=><a href={`#${p.id}`} key={p.id}><span>0{i+1}</span>{p.label}<Arrow/><ReadingTrack section={p.id}/></a>)}</nav><div className="research-topics">{projects.map((p,i)=><article className="research-topic" id={p.id} data-reading-section key={p.id} aria-labelledby={`${p.id}-title`}><div className="topic-grid"><div className="topic-heading"><p className="eyebrow">0{i+1} / {p.label}</p><h3 id={`${p.id}-title`}>{p.title}</h3><ReadingTrack section={p.id}/><p className="research-meta">{p.meta}</p></div><div className="topic-copy"><h4>{p.question}</h4><p>{p.text}</p><p>{p.detail}</p>{p.note&&<p className="project-note">{p.note}</p>}{p.url&&<a className="text-link" href={p.url} target="_blank" rel="noreferrer">{p.link}<Arrow up/></a>}</div></div>{i===1&&<figure className="science-figure"><div className="figure-heading"><span className="eyebrow">A view from the data</span><button className="small-button" onClick={()=>dialog.current?.showModal()}>Expand figure ⤢</button></div><button className="figure-image-button" aria-label="Expand DeepDive outflow figure" onClick={()=>dialog.current?.showModal()}><img src={assetPath("/deepdive-outflows.png")}  alt="Star formation rate versus stellar mass and neutral gas velocity offset for DeepDive galaxies and literature samples. Distant quiescent galaxies show neutral outflows despite low star formation rates." width="5235" height="1886" loading="lazy"/></button><figcaption><strong>Neutral gas in galaxies with little star formation.</strong> Star formation rate versus stellar mass and gas velocity offset. Original figure from <External href="https://arxiv.org/html/2602.17767v2#S3.F3">Zhu et al. (2026), Fig. 3</External>. Symbols and uncertainties retain the paper’s definitions.</figcaption></figure>}</article>)}</div></div></section>
 <section data-reading-section id="publications" className="section publications" aria-labelledby="publications-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>03</span>Publications</p><a className="text-link" href={assetPath("/publications.bib")}  download>Download bibliography <small>BIB</small>↓</a></div><div className="publications-heading"><SectionTitle section="publications">Publications</SectionTitle><p>Selected work on gas flows, quenching, and galaxy dynamics, alongside publications with the DeepDive and SQuIGGLE collaborations.</p></div><a className="scix-link" href={sciXUrl} target="_blank" rel="noreferrer"><span><small>My publication list</small>Explore all papers on SciX</span><Arrow up/></a><p className="scix-note">{publications.length} publications and preprints, matched to SciX · Updated {publicationSource.displayDate}.</p><div className="publication-controls"><div className="filter-buttons" role="group" aria-label="Filter publications">{[["selected","Selected"],["all",`All publications · ${publications.length}`],["first","First author"]].map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</div><div className="search-controls"><label className="search-label"><span className="sr-only">Search publications</span><span aria-hidden="true">⌕</span><input type="search" value={query} placeholder="Search papers…" onChange={e=>{setQuery(e.target.value);if(e.target.value)setFilter("all")}}/></label><label><span className="sr-only">Filter by year</span><select value={year} onChange={e=>setYear(e.target.value)}><option value="all">All years</option>{Array.from(new Set(publications.map(p => p.year))).sort((a,b) => Number(b)-Number(a)).map(y=><option key={y}>{y}</option>)}</select></label></div></div><p className="result-count" aria-live="polite">{matches.length} {matches.length===1?"publication":"publications"} {filter==="selected"?"selected":"shown"}<span>SciX bibliography · {publicationSource.displayDate}</span></p>
 <div className="publication-list">{matches.map(p=><article className="publication" key={p.id}><div className="publication-year">{p.year}<span>{p.firstAuthor?"First author":p.preprint?"Preprint":"Coauthor"}</span></div><div className="publication-content"><h3><External href={p.doi?`https://doi.org/${p.doi}`:`https://arxiv.org/abs/${p.arxiv}`}>{p.title} <Arrow up/></External></h3><p className="authors">{p.authors.split("Pengpei Zhu").map((part,i)=><span key={i}>{i>0&&<strong>Pengpei Zhu</strong>}{part}</span>)}{!p.includesAuthor&&<span> · with <strong>Pengpei Zhu</strong></span>}</p><p className="journal">{p.journal}{p.volume&&` ${p.volume}`}{p.pages&&`, ${p.pages}`}{p.preprint&&` · arXiv:${p.arxiv}`}</p>{"summary" in p&&p.summary&&<p className="publication-summary">{p.summary}</p>}<div className="publication-links">{p.doi&&<External href={`https://doi.org/${p.doi}`}>Journal <Arrow up/></External>}{p.arxiv&&<External href={`https://arxiv.org/abs/${p.arxiv}`}>arXiv <Arrow up/></External>}<details><summary>BibTeX +</summary><div className="citation-panel"><button className="small-button" onClick={()=>copy(p.bib,"BibTeX citation copied.")}>Copy BibTeX</button><pre tabIndex={0}>{p.bib}</pre></div></details></div></div></article>)}</div>{!matches.length&&<div className="empty-state"><h3>No papers match these filters.</h3><p>Try a different title, author, or year.</p><button className="button" onClick={()=>{setQuery("");setYear("all");setFilter("all")}}>Clear filters <Arrow/></button></div>}<p className="publication-footnote">For full author lists and the latest publication status, follow the journal and arXiv links. <External href="https://orcid.org/0000-0002-6768-8335">View ORCID <Arrow up/></External></p></div></section>
 <section id="panels" data-reading-section className="section panels" aria-labelledby="panels-title">
   <div className="wrap">
     <div className="section-header"><p className="eyebrow"><span>04</span>Interactive projects</p></div>
     <div className="intro-grid">
       <SectionTitle section="panels">Explore<br/>the science.</SectionTitle>
       <div className="intro-copy">
         <p className="lead">What can a galaxy’s light tell us?</p>
         <p>Try a few examples here, or open a full lab to change the model parameters and explore the results.</p>
       </div>
     </div>
     <InteractiveProjects />
   </div>
 </section>
 <section id="talks" data-reading-section className="section talks-section" aria-labelledby="talks-title">
   <div className="wrap">
     <div className="section-header"><p className="eyebrow"><span>05</span>Presentations</p></div>
     <SectionTitle section="talks">Talks &amp; Posters</SectionTitle>
     <ol className="presentation-list">
       {presentations.map(presentation => (
         <li className="presentation-row" key={presentation.id}>
           <div>
             <p className="presentation-format">{presentation.format}</p>
             <h3>{presentation.title}</h3>
             <p className="presentation-event"><External href={presentation.href}>{presentation.event} <Arrow up/></External></p>
             <p className="presentation-date">{presentation.venue} · <time dateTime={presentation.startDate}>{presentation.date}</time></p>
           </div>
           <div className="presentation-slot" aria-hidden="true" />
         </li>
       ))}
     </ol>
   </div>
 </section>
 <section id="photography" data-reading-section className="section photography" aria-labelledby="photography-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>06</span>Astrophotos</p><span className="section-note">Under the same sky</span></div><div className="intro-grid"><SectionTitle section="photography">Astrophotos</SectionTitle><div className="intro-copy"><p className="lead">Looking up, beyond the spectra.</p><p>A selection of my recent astrophotography — star trails, interstellar dust, and quiet moments under the night sky. Select a photograph to take a closer look.</p></div></div><div className="photo-gallery">{photos.map((photo,i)=><figure className={`photo-card ${i===0?"featured-photo":""} ${photo.height>photo.width?"portrait-photo":""}`} key={photo.src}><button onClick={()=>openPhoto(i)} aria-label={`Enlarge ${photo.caption}`}><img src={assetPath(photo.src)} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy"/><span className="photo-expand" aria-hidden="true">⤢</span></button><figcaption><span>{photo.caption}</span><time dateTime={photo.date}>{photo.displayDate}</time></figcaption></figure>)}</div><p className="photo-credit">Photographs by Pengpei Zhu <span lang="zh">朱芃佩</span></p></div></section>
 <section data-reading-section id="cv" className="section cv-section" aria-labelledby="cv-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>07</span>Curriculum vitae</p><span className="section-note">A path through astronomy</span></div><div className="cv-layout"><div className="cv-intro"><SectionTitle section="cv">Curriculum<br/>vitae</SectionTitle><p>From astrophysics and philosophy at Santa Cruz to spectroscopy at Leiden and galaxy evolution at DAWN.</p><a className="button" href={assetPath(`/${cvFilename}`)} download={cvFilename}>Download full CV ↓</a><p className="download-note">PDF · 4 pages · 9 November 2026</p></div><div className="cv-details"><h3 className="eyebrow">Education</h3><ol className="timeline"><li><span>2024 — present</span><div><h4>PhD in Astrophysics</h4><p>Cosmic Dawn Center · DTU Space</p><small>Supervisor: Francesco Valentino</small></div></li><li><span>2022 — 2024</span><div><h4>MSc in Astronomy</h4><p>Leiden University, the Netherlands</p><small>Astronomy Research programme</small></div></li><li><span>2017 — 2022</span><div><h4>BS in Physics &amp; BA in Philosophy</h4><p>University of California, Santa Cruz</p><small>Astrophysics and philosophy of science</small></div></li></ol><div className="cv-detail-columns"><div><h3 className="eyebrow">Recognition</h3><p><External href="https://www.universiteitleiden.nl/en/news/2024/11/several-leiden-science-students-excel-and-win-khmw-young-talent-awards">KHMW Young Talent Award <Arrow up/></External><small>Astronomy master’s thesis prize · 2024</small></p><p>UCSC Dean’s Scholarship<small>Undergraduate studies</small></p></div><div><h3 className="eyebrow">Community</h3><p>DTU Space PhD Committee<small>Member · 2026–2027</small></p><p>DAWN Summit 2025<small>Scientific Organizing Committee</small></p><p>Public observing at Leiden<small>L.A.D. “F. Kaiser” · 2022–2023</small></p></div></div></div></div></div></section>
 <section data-reading-section id="contact" className="section contact" aria-labelledby="contact-title"><div className="wrap"><div className="section-header"><p className="eyebrow"><span>08</span>Contact</p><span className="section-note">Ideas are better shared</span></div><div className="contact-layout"><div><SectionTitle section="contact">Let’s talk<br/><em>about galaxies.</em></SectionTitle><p>For research discussions, collaborations, or questions about my work, the best way to reach me is by email.</p><div className="email-row"><a href={`mailto:${emailAddress}`}>{emailAddress} <Arrow up/></a><button onClick={()=>copy(emailAddress,"Email address copied.")} aria-label="Copy email address">Copy</button></div></div><div className="contact-institution"><span className="eyebrow">Based at</span><h3>Cosmic Dawn Center</h3><p>DTU Space<br/>Technical University of Denmark<br/>Kgs. Lyngby, Denmark</p><div className="contact-links"><External href="https://cosmicdawn.dk/staff/pengpei-zhu/">DAWN profile <Arrow up/></External><External href="https://orcid.org/0000-0002-6768-8335">ORCID <Arrow up/></External></div></div></div></div></section>
 <section id="visitors" data-reading-section className="section visitors" aria-labelledby="visitors-title"><div className="wrap"><div className="visitor-layout"><div><p className="eyebrow">From around the world</p><SectionTitle section="visitors">Visitors</SectionTitle><p>A little map of where our paths cross.</p></div><div className="visitor-placeholder"><span className="map-symbol" aria-hidden="true">◎</span><div><h3>Visitor map</h3><p>Coming soon · A place for MapMyVisitors.</p><a href="https://mapmyvisitors.com/" target="_blank" rel="noreferrer">About MapMyVisitors <Arrow up/></a></div></div></div><footer><a href="#top">Pengpei Zhu <span lang="zh">朱芃佩</span></a><span>© 2026 · Astronomy &amp; curiosity</span><a href="#top">Back to top ↑</a></footer></div></section>
</main>
 <dialog ref={dialog} className="figure-dialog" aria-labelledby="figure-title" onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div className="dialog-header"><h2 id="figure-title">DeepDive · Neutral gas outflows</h2><button autoFocus className="small-button" onClick={()=>dialog.current?.close()}>Close ×</button></div><img src={assetPath("/deepdive-outflows.png")}  alt="Expanded original DeepDive figure comparing star formation rate with stellar mass and gas velocity offset."/><p>Original figure from Zhu et al. (2026), Fig. 3. <External href={assetPath("/deepdive-outflows.png")} >Open full-resolution image <Arrow up/></External></p></dialog>
 <dialog ref={photoDialog} className="photo-dialog" aria-labelledby="photo-title" onClick={e=>{if(e.target===photoDialog.current)photoDialog.current.close()}} onKeyDown={e=>{if(e.key==="ArrowLeft"){e.preventDefault();stepPhoto(-1)}if(e.key==="ArrowRight"){e.preventDefault();stepPhoto(1)}}}><div className="dialog-header"><h2 id="photo-title">{photo.caption}</h2><button autoFocus className="small-button" onClick={()=>photoDialog.current?.close()}>Close ×</button></div><img src={assetPath(photo.src)} alt={photo.alt} width={photo.width} height={photo.height}/><div className="photo-dialog-footer"><button className="small-button" onClick={()=>stepPhoto(-1)} aria-label="Previous photograph">← Previous</button><p aria-live="polite">{photoIndex+1} / {photos.length} · {photo.displayDate}</p><button className="small-button" onClick={()=>stepPhoto(1)} aria-label="Next photograph">Next →</button></div></dialog>
<div role="status" aria-live="polite" className={`toast ${notice?"visible":""}`}>{notice}</div></>;
}
