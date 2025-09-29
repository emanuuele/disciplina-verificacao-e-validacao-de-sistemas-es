# Princípios de Testes de Software & Code Smells

## 📌 Introdução
Testes de unidade são essenciais para garantir qualidade e segurança na evolução de sistemas.  
Assim como o código de produção, testes também podem ter **boas práticas** e **maus cheiros (smells)**.  
Este documento resume os principais **princípios (FIRST)** e os **smells mais comuns**, com exemplos práticos.

---

## ✅ Princípios FIRST

A sigla **FIRST** reúne boas práticas para testes de unidade:

- **Fast (Rápido):** devem rodar em milissegundos.  
  ❌ Ruim: teste acessando banco real.  
  ✅ Bom: teste com mock/fake sem I/O.

- **Independent (Independente):** não dependem da ordem de execução.  
  ❌ Ruim: `testB` só passa se `testA` rodar antes.  
  ✅ Bom: cada teste cria seu próprio contexto.

- **Repeatable (Repetível):** sempre dão o mesmo resultado.  
  ❌ Ruim: depende da hora do sistema.  
  ✅ Bom: usa dados fixos e controlados.

- **Self-Validating (Auto-validável):** devem falhar sozinhos com asserts.  
  ❌ Ruim: precisa olhar logs manualmente.  
  ✅ Bom: `assertEquals(5, soma(2,3));`.

- **Timely (Oportuno):** escritos junto com o código.  
  ❌ Ruim: testes feitos muito tempo depois.  
  ✅ Bom: criados logo após (ou antes, via TDD).

## Refs:

https://engsoftmoderna.info/cap8.html#princ%C3%ADpios-e-smells[https://engsoftmoderna.info/cap8.html#princ%C3%ADpios-e-smells]
