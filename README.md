# Portfolio — Tiago Reiz

Meu currículo online: um site de página única com experiência profissional, projetos, skills e formação, focado em backend, IA/RAG e sistemas distribuídos.

**Acesse:** https://tiagoareiz.github.io/Portfolio/

## Stack

- HTML, CSS e JavaScript puros — sem framework, sem build, sem dependências
- Fonte Inter via Google Fonts
- Animações com `IntersectionObserver` e `requestAnimationFrame`, respeitando `prefers-reduced-motion`
- Hospedado no GitHub Pages

## Seções

| Seção | Conteúdo |
| --- | --- |
| Início | Apresentação com cargos em rotação |
| Statement | Resumo do meu perfil profissional |
| Impacto | Números e resultados de destaque |
| Experiência | Histórico profissional |
| Projetos | Projetos selecionados |
| Skills | Tecnologias e ferramentas |
| Formação | Formação acadêmica e cursos |
| Contato | Links para contato (rodapé) |

## Como rodar localmente

Não há etapa de build. Basta abrir o `index.html` no navegador ou servir a pasta:

```bash
git clone https://github.com/TiagoAReiz/Portfolio.git
cd Portfolio
python -m http.server 8000   # ou: npx serve .
```

Depois acesse http://localhost:8000.

## Estrutura

```
index.html   # conteúdo e marcação
style.css    # estilos e animações
main.js      # interações (scroll, cursor, reveal, menu mobile)
```
