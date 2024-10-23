let skills = ["HTML", "CSS", "JAVA", "JAVASCRIPT", "PYTHON", "AZURE", "SQL"]

// Mapeamento de skills para seus textos correspondentes
let descriptions = {
  HTML: `<h1 id="nome">HTML</h1>
    <p id="txt">Nivel: Avançado <br>
        Realizei cursos de HTML assim como aprendi muito na minha graduação e sigo aprendendo dia apos dia
    </p>`,
  CSS: `<h1 id="nome">CSS</h1>
    <p id="txt">Nivel: Avançado <br>
        Utilizo CSS em diversos projetos web e sigo aprendendo novas técnicas.
    </p>`,
  JAVA: `<h1 id="nome">JAVA</h1>
    <p id="txt">Nivel: Intermediário <br>
        Faço uso dessa linguagem diáriamente e desejo me desenvolver mais nela.
    </p>`,
  JAVASCRIPT: `<h1 id="nome">JavaScript</h1>
    <p id="txt">Nivel: Avançado <br>
        Utilizo JS em diversos projetos web, me saio bem, mas gostaria de me aprimorar mais na linguagem, por isso venho realizando cursos na área.
    </p>`,
  PYTHON: `<h1 id="nome">Python</h1>
    <p id="txt">Nivel: Avançado <br>
        Utilizei bastante Python durante um tempo, fiz alguns cursos do mesmo e aprendi muito na faculdade, focando bastante no desenvolvimento de scripts,
        porém desejo aprender a utiliza-lo na área de automação e cloud.
    </p>`,
  AZURE: `<h1 id="nome">Azure</h1>
    <p id="txt">Nivel: Intermediário <br>
        Realizei diversos cursos de cloud Azure e tenho as certificações AZ900 e SC900, pretendo me desenvolver mais e tirar outras como AZ104 que estou estudando no momento para 
        realizar a prova.
    </p>`,
  SQL: `<h1 id="nome">SQL</h1>
    <p id="txt">Nivel: Basico <br>
        Fiz um curso no qual aprendi comandos basicos para gerenciar e criar bancos de dados com linguagem SQL.
    </p>`,
}

// Adicionando o evento de clique para cada skill
skills.forEach((skill) => {
  let element = document.getElementById(skill)
  element.addEventListener("click", function () {
    document.getElementById("inf").style.backGroundColor = "black"
    // Atualiza o conteúdo do elemento com o ID "inf" com o texto correspondente à skill clicada
    document.getElementById("inf").innerHTML = descriptions[skill]
  })
})
