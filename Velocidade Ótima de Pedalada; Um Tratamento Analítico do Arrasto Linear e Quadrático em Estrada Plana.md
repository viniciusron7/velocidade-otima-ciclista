## TL;DR
- **Sim — existe uma velocidade ótima** $v^{*}$ que minimiza a energia metabólica gasta por unidade de distância, *desde que* o custo metabólico de manutenção (basal/postural) seja contabilizado; sem ele, o modelo prevê apenas que andar arbitrariamente devagar economiza energia, o que contradiz a intuição.
- Para arrasto **linear** ($F = bv$) obtém-se $v^{*}_{\text{lin}} = \sqrt{P_0/b}$; para arrasto **quadrático** ($F = cv^{2}$, fisicamente o caso relevante em ciclismo) obtém-se $v^{*}_{\text{quad}} = \left(P_0/2c\right)^{1/3}$, onde $P_0$ é a potência basal/manutenção. As escalas (raiz quadrada vs. raiz cúbica) tornam $v^{*}_{\text{quad}}$ muito menos sensível à intensidade basal do que $v^{*}_{\text{lin}}$.
- O modelo quadrático é o fisicamente correto para ciclismo (Reynolds $\sim 10^{5}$, escoamento turbulento), tornando a potência dissipada cúbica em $v$ — daí, a partir de $P\propto v^{3}$, dobrar a velocidade exige 8× mais potência aerodinâmica, conforme validado por Martin et al. (J. Appl. Biomech. 14, 1998, $R^{2}=0{,}97$).

---

## 1. Introdução e Formulação do Problema

Considere um/a ciclista de massa total $m$ (ciclista + bicicleta) movendo-se ao longo do eixo $x$ em uma estrada plana, sem vento. A pergunta central é: existe uma velocidade $v$ constante que minimize o **gasto energético por distância percorrida**, $E/D$?

A intuição sugere uma tensão entre dois efeitos antagônicos:

1. **Andar mais devagar** reduz o arrasto aerodinâmico — que é a força resistiva dominante para velocidades acima de cerca de 4 m/s (15 km/h). Blocken et al. (J. Wind Eng. Ind. Aerodyn. 211, 2021), citando Grappe et al. (1997) e Kyle & Burke (1984), resumem o fato: *"Aerodynamic drag is indeed the major resistive force in cycling, up to 90% when the cyclist is traveling on a level road at speeds of about 40 km/h and beyond"*.
2. **Andar mais devagar** também aumenta o tempo de viagem; e como o organismo consome energia mesmo em repouso (taxa metabólica basal, postura, manter o equilíbrio sobre a bicicleta, trabalho interno dos membros), o tempo de viagem multiplicado por essa potência fixa cresce sem limite quando $v \to 0$.

Há, portanto, um compromisso, e este artigo busca formalizá-lo nos dois modelos canônicos de arrasto encontrados em mecânica clássica: $F \propto v$ (regime de Stokes, baixo número de Reynolds) e $F \propto v^{2}$ (regime de Newton, alto Reynolds).

A formulação considera apenas o problema **simbólico/analítico** — não atribuiremos valores numéricos. Tratamos o problema em três níveis de profundidade matemática:

- **Nível Física I:** cinemática, leis de Newton, otimização por $dE/dv = 0$.
- **Nível intermediário:** EDOs separáveis, soluções exponenciais (linear) e em tangente hiperbólica (quadrática), velocidades terminais.
- **Nível avançado:** análise dimensional, regimes de validade, comentários sobre cálculo variacional.

---

## 2. Física do Arrasto Aerodinâmico

### 2.1 Regimes do número de Reynolds

A natureza da força de arrasto depende do número de Reynolds adimensional
$$
\mathrm{Re} = \frac{\rho v L}{\mu},
$$
onde $\rho$ é a densidade do fluido, $L$ uma escala de comprimento característica do corpo, $\mu$ a viscosidade dinâmica e $v$ a velocidade relativa entre corpo e fluido.

- **Regime de Stokes**, $\mathrm{Re} \ll 1$: o escoamento é laminar e dominado pela viscosidade. Para uma esfera de raio $r$, Stokes (1851) derivou exatamente a partir das equações de Navier–Stokes a chamada **lei de Stokes**:
$$
F_{\text{drag}} = 6\pi \mu r v \equiv b\, v.
$$
Esta lei é válida apenas para "creeping flow", isto é, $\mathrm{Re} \lesssim 1$, e aplica-se a partículas muito pequenas em líquidos viscosos — grãos de sedimento em suspensão, gotículas de neblina, hemácias em centrifugação.

- **Regime quadrático (de Newton)**, $10^{3} \lesssim \mathrm{Re} \lesssim 2 \times 10^{5}$: o escoamento é turbulento e dominado pelas forças inerciais. O arrasto é
$$
F_{\text{drag}} = \tfrac{1}{2}\rho C_{d} A\, v^{2} \equiv c\, v^{2},
$$
onde $A$ é a área frontal projetada e $C_{d}$ é o coeficiente de arrasto adimensional (dependente da forma).

Para um ciclista típico ($L \sim 0{,}5$ m, $v \sim 10$ m/s, $\rho_{\text{ar}} \sim 1{,}2$ kg/m³, $\mu_{\text{ar}} \sim 1{,}8 \times 10^{-5}$ Pa·s), $\mathrm{Re} \sim 3 \times 10^{5}$. Estamos firmemente no regime quadrático — Timmerman & van der Weele (Am. J. Phys. 67, 538, 1999) enfatizam que os dois regimes "correspondem a faixas específicas do número de Reynolds (Re < 1 e $10^{3} <$ Re $< 2 \times 10^{5}$ respectivamente) e não valem fora destes intervalos."

O ciclismo está, portanto, **claramente no regime quadrático**, mas o problema didático pede a análise comparativa dos dois modelos por motivos pedagógicos: ambos aparecem em capítulos introdutórios de mecânica clássica (OpenStax University Physics §6.4; LibreTexts §7.7; AP Physics C §2.9) e cada um produz EDOs distintas com soluções de complexidade crescente.

### 2.2 Outras forças no ciclismo

Além do arrasto aerodinâmico, atuam:

1. **Resistência ao rolamento** $F_{\text{roll}} = C_{\text{rr}} m g$, aproximadamente constante (independente de $v$). Forte et al. (Int. J. Environ. Res. Public Health 17, 3430, 2020) afirmam explicitamente: *"Drag accounts for 90% and rolling resistance for about 10% of the total resistive forces"* à velocidade média de ~40 km/h dos ciclistas profissionais em estrada.
2. **Gravidade** $F_{g} = m g \sin\theta = 0$ em estrada plana ($\theta = 0$).
3. **Atrito interno** (transmissão, mancais, ineficiência da corrente). Martin et al. (J. Appl. Biomech. 14, 276–291, 1998) mediram a eficiência da transmissão em **97,698%**, implicando perdas de apenas ~2,3% (e não os ~4% por vezes citados); o erro padrão entre potência modelada e potência medida foi de apenas 2,7 W.

Nas seções seguintes, absorveremos a resistência ao rolamento na potência basal/manutenção $P_{0}$ (já que ambas são essencialmente independentes de $v$ ou linearmente proporcionais), focando o contraste entre os dois modelos de arrasto.

---

## 3. Equações de Movimento

Seja $F_{\text{prop}}$ a força propulsora exercida pelo/a ciclista, e $v(t) = \dot x(t)$ a velocidade.

### 3.1 Modelo linear: $F_{\text{drag}} = -bv$

A segunda lei de Newton fornece
$$
m \frac{dv}{dt} = F_{\text{prop}} - b v. \tag{3.1}
$$

**Caso (a): força propulsora constante $F_{\text{prop}} = F_{0}$.**
Esta é uma EDO linear de primeira ordem, separável:
$$
\frac{dv}{F_{0}/m - (b/m)\,v} = dt.
$$
Definindo a velocidade terminal $v_{\infty} \equiv F_{0}/b$ e a constante de tempo $\tau \equiv m/b$, a solução com condição inicial $v(0) = v_{i}$ é
$$
\boxed{\; v(t) = v_{\infty} + (v_{i} - v_{\infty}) e^{-t/\tau}.\;} \tag{3.2}
$$
A velocidade aproxima-se exponencialmente da terminal. Para $v_{i} = 0$:
$$
v(t) = v_{\infty}\bigl(1 - e^{-t/\tau}\bigr),
\qquad
x(t) = v_{\infty} t - v_{\infty}\tau\bigl(1 - e^{-t/\tau}\bigr). \tag{3.3}
$$
Assintoticamente $x(t) \sim v_{\infty} t - v_{\infty}\tau$ — movimento uniforme com um "atraso" $\tau$ devido à aceleração inicial.

**Caso (b): força nula, desaceleração pura ($F_{\text{prop}}=0$, ciclista em ponto morto).**
Tem-se $m\,dv/dt = -bv$, com solução exponencial decrescente $v(t) = v_{0}\,e^{-t/\tau}$, e
$$
x(t) = v_{0}\tau\bigl(1 - e^{-t/\tau}\bigr).
$$
Note a peculiaridade: a distância total percorrida é **finita** ($x_{\infty} = v_{0}\tau$), embora a velocidade nunca chegue exatamente a zero (paradoxo de Zenão suave).

### 3.2 Modelo quadrático: $F_{\text{drag}} = -cv^{2}$

A EDO é
$$
m \frac{dv}{dt} = F_{0} - c v^{2}. \tag{3.4}
$$
Esta é uma equação não-linear, mas ainda separável. A velocidade terminal é
$$
v_{\infty} = \sqrt{F_{0}/c}.
$$
Definindo $u = v/v_{\infty}$ e $\tau \equiv v_{\infty}/(F_{0}/m) = m/(c v_{\infty})$, obtemos
$$
\frac{du}{1 - u^{2}} = \frac{dt}{\tau}.
$$
A integral $\int du/(1-u^{2}) = \operatorname{arctanh}(u)$ dá, com $v(0) = 0$:
$$
\boxed{\; v(t) = v_{\infty} \tanh\!\left(\frac{t}{\tau}\right).\;} \tag{3.5}
$$
Esta é a famosa "aproximação em tangente hiperbólica" para o regime quadrático, distinta da aproximação exponencial do regime linear (cf. Taylor, *Classical Mechanics*, §2.4).

Integrando para a posição:
$$
x(t) = \int_{0}^{t} v_{\infty}\tanh(t'/\tau)\,dt' = v_{\infty}\tau \,\ln\!\bigl[\cosh(t/\tau)\bigr]. \tag{3.6}
$$
Para tempos grandes, $\cosh(x) \sim \tfrac{1}{2}e^{x}$, então $x(t) \sim v_{\infty}t - v_{\infty}\tau \ln 2$ — novamente movimento uniforme com um atraso constante.

**Desaceleração pura ($F_{0}=0$):** $m\,dv/dt = -c v^{2}$, com solução
$$
v(t) = \frac{v_{0}}{1 + v_{0} t/(\tau v_{\infty})} = \frac{v_{0}}{1 + (c v_{0}/m) t},
$$
e a distância percorrida diverge como $\ln(t)$ — em contraste com o caso linear, **não há distância de parada finita**.

### 3.3 Comportamento assintótico — comparação

| Modelo | Aproximação a $v_\infty$ | Distância em desaceleração pura |
|---|---|---|
| Linear ($bv$) | Exponencial, $\sim e^{-t/\tau}$ | Finita, $x_\infty = v_0 m/b$ |
| Quadrático ($cv^2$) | Hiperbólica, $\sim \tanh(t/\tau)$ | Diverge logaritmicamente |

---

## 4. Energia, Trabalho e Potência Dissipada

Em regime estacionário a velocidade $v$ constante, a força propulsora iguala-se à de arrasto: $F_{\text{prop}} = F_{\text{drag}}(v)$. A potência mecânica entregue às rodas para vencer o arrasto é
$$
P_{\text{drag}}(v) = F_{\text{drag}}(v) \cdot v.
$$

- **Modelo linear:** $\quad P_{\text{drag}} = b v^{2}$.
- **Modelo quadrático:** $\quad P_{\text{drag}} = c v^{3} = \tfrac{1}{2}\rho C_{d} A v^{3}$.

Esta relação cúbica entre potência e velocidade é uma consequência direta de $P \propto v^{3}$: dobrar a velocidade exige $2^{3}=8$ vezes mais potência aerodinâmica. Esta previsão foi confirmada experimentalmente por Martin et al. (J. Appl. Biomech. 14, 1998), cujo modelo quadrático apresenta $R^{2}=0{,}97$ contra medidas de campo com powermeter SRM; em ciclistas típicos a 40 km/h, aproximadamente 92% da potência total (~357 W) é dissipada aerodinamicamente.

Em uma viagem de distância $D$ percorrida a velocidade constante $v$, o tempo é $t = D/v$ e a energia mecânica gasta apenas com arrasto é
$$
E_{\text{drag}} = P_{\text{drag}}\cdot t = \frac{P_{\text{drag}}(v)}{v}\cdot D.
$$
Logo, a energia de arrasto **por unidade de distância** é
$$
\left.\frac{E_{\text{drag}}}{D}\right|_{\text{lin}} = b v,
\qquad
\left.\frac{E_{\text{drag}}}{D}\right|_{\text{quad}} = c v^{2}. \tag{4.1}
$$
Ambas crescem com $v$. **Se considerássemos apenas o arrasto**, a conclusão seria trivial: a velocidade ótima seria $v^{*} = 0$. Para um problema interessante, devemos considerar o gasto metabólico total.

---

## 5. Otimização — A Velocidade Ótima

### 5.1 A potência basal/manutenção $P_0$

O corpo humano consome energia mesmo em repouso completo (taxa metabólica basal, BMR), além do custo extra de postura, equilíbrio, trabalho interno dos membros que oscilam, e resistência ao rolamento, todos essencialmente independentes da velocidade de translação. Agregamos todas essas contribuições em uma potência $P_{0}$ que o organismo dissipa enquanto pedala, independentemente de $v$. A potência metabólica total é então
$$
P_{\text{total}}(v) = P_{0} + P_{\text{drag}}(v). \tag{5.1}
$$

A **energia metabólica gasta por unidade de distância** (a quantidade que queremos minimizar — é precisamente o "custo de transporte") é
$$
\frac{E}{D}(v) = \frac{P_{\text{total}}(v)}{v} = \frac{P_{0}}{v} + \frac{P_{\text{drag}}(v)}{v}. \tag{5.2}
$$

Esta função tem a estrutura típica de **competição entre dois termos**: um que decresce como $1/v$ (o custo fixo distribuído pelo tempo de viagem) e um que cresce com $v$ (a dissipação aerodinâmica). A existência de um mínimo interno é garantida pela convexidade da soma.

A interpretação é exatamente a do "Cost of Transport" (COT): conforme a entrada da Wikipedia em concordância com a literatura de bioenergética, "o custo metabólico de transporte inclui o custo basal de manutenção das funções corporais, e portanto vai a infinito quando a velocidade vai a zero." A presença obrigatória de $P_{0}$ como termo aditivo (energia *bruta*, não *líquida*) é o que torna o problema bem-posto. O análogo mais cristalino na literatura científica é o problema da velocidade de máximo alcance de aves em vôo de batimento, Pennycuick (Ibis 111, 525, 1969) e Hedenström & Alerstam (Phil. Trans. R. Soc. B 348, 471, 1995), em que $P(V) = A/V + BV^{3} + C$ com $V_{\text{mr}}$ obtido de $d(P/V)/dV = 0$.

### 5.2 Caso linear

Substituindo $P_{\text{drag}}=bv^{2}$ em (5.2):
$$
\frac{E}{D}(v) = \frac{P_{0}}{v} + b v. \tag{5.3}
$$

Para minimizar, calculamos a derivada e a igualamos a zero:
$$
\frac{d}{dv}\!\left[\frac{P_{0}}{v} + b v\right] = -\frac{P_{0}}{v^{2}} + b = 0
\quad\Longrightarrow\quad v^{2} = \frac{P_{0}}{b}.
$$
Portanto
$$
\boxed{\; v^{*}_{\text{lin}} = \sqrt{\frac{P_{0}}{b}}.\;} \tag{5.4}
$$

A segunda derivada é $2P_{0}/v^{3} > 0$, confirmando que se trata de um mínimo (não máximo nem ponto de sela). O custo mínimo por distância é
$$
\left.\frac{E}{D}\right|_{\text{mín}} = 2\sqrt{P_{0}\,b}.
$$
**Equilíbrio entre termos:** no ótimo, $P_{0}/v^{*} = bv^{*}$, isto é, o gasto basal por unidade de distância iguala-se exatamente ao gasto de arrasto por unidade de distância. Esta é uma propriedade geral de minimização do tipo $f(x) = A/x + Bx$ (Cauchy-AM-GM).

### 5.3 Caso quadrático

Substituindo $P_{\text{drag}} = c v^{3}$ em (5.2):
$$
\frac{E}{D}(v) = \frac{P_{0}}{v} + c v^{2}. \tag{5.5}
$$

Derivando e igualando a zero:
$$
-\frac{P_{0}}{v^{2}} + 2 c v = 0
\quad\Longrightarrow\quad
v^{3} = \frac{P_{0}}{2c}.
$$
Portanto
$$
\boxed{\; v^{*}_{\text{quad}} = \left(\frac{P_{0}}{2c}\right)^{1/3}.\;} \tag{5.6}
$$

A segunda derivada é $2P_{0}/v^{3} + 2c > 0$, confirmando o mínimo. O custo mínimo por distância é
$$
\left.\frac{E}{D}\right|_{\text{mín}} = \frac{3}{2^{2/3}}\,P_{0}^{2/3}\,c^{1/3}.
$$

No ponto ótimo a relação entre termos vale **2:1** (basal: arrasto):
$$
\frac{P_{0}}{v^{*}} = 2\,c\,(v^{*})^{2},
$$
isto é, a dissipação aerodinâmica por distância vale apenas metade da dissipação basal por distância no mínimo. Esta é a manifestação da regra geral: para $f(v) = A/v + Bv^{n}$, no mínimo o termo de potência $n$ tem peso $1/n$ vezes o termo $1/v$.

### 5.4 Existência e unicidade

Em ambos os casos, $E/D(v)$ é uma função suave em $(0,\infty)$ com
$$
\lim_{v\to 0^{+}}\frac{E}{D} = +\infty, \qquad \lim_{v\to\infty}\frac{E}{D} = +\infty.
$$
e estritamente convexa (segunda derivada positiva em todo $v>0$). Portanto o mínimo existe, é único e é interior — não há ambiguidade.

---

## 6. Análise Dimensional e Comparação dos Modelos

### 6.1 Verificação dimensional

- $b$ tem dimensão $[\text{kg/s}]$ (força/velocidade); $P_{0}$ tem dimensão $[\text{W}] = [\text{kg·m}^{2}/\text{s}^{3}]$. Logo $P_{0}/b$ tem dimensão $[\text{m}^{2}/\text{s}^{2}]$, e $\sqrt{P_{0}/b}$ tem dimensão de velocidade. ✓
- $c$ tem dimensão $[\text{kg/m}]$ (força/velocidade²); $P_{0}/c$ tem dimensão $[\text{m}^{3}/\text{s}^{3}]$; $\left(P_{0}/(2c)\right)^{1/3}$ tem dimensão de velocidade. ✓

### 6.2 Escalonamento (leis de escala)

| Parâmetro | $v^{*}_{\text{lin}}$ | $v^{*}_{\text{quad}}$ |
|---|---|---|
| $P_{0}$ (potência basal) | $\propto P_{0}^{1/2}$ | $\propto P_{0}^{1/3}$ |
| Coef. de arrasto ($b$ ou $c$) | $\propto b^{-1/2}$ | $\propto c^{-1/3}$ |
| $E/D$ no mínimo | $\propto P_{0}^{1/2}\,b^{1/2}$ | $\propto P_{0}^{2/3}\,c^{1/3}$ |

A consequência prática mais importante: **a velocidade ótima no modelo quadrático é muito menos sensível à potência basal** (e ao coeficiente de arrasto) do que no modelo linear. Isto significa que ciclistas com taxas metabólicas basais diferentes deveriam, no modelo quadrático, escolher velocidades ótimas relativamente próximas — uma previsão consistente com a observação empírica de que cicloturistas adotam uma faixa estreita de velocidades de cruzeiro (tipicamente 18–25 km/h) apesar da grande variabilidade fisiológica.

### 6.3 Por que o modelo quadrático é o fisicamente relevante

Como apontado, $\mathrm{Re} \sim 10^{5}$ no ciclismo, firmemente no regime turbulento. A confirmação empírica vem de di Prampero, Cortili, Mognoni e Saibene (J. Appl. Physiol. 47, 201, 1979): *"Tractional resistance ($R_{T}$, N) was determined by towing two cyclists on a racing bike in 'fully dropped' posture in calm air on a flat track at constant speed (5–16.5 m/s). $R_{T}$ increased with the air velocity (v, m/s): $R_{T} = 3{,}2 + 0{,}19 v^{2}$. The constant 3.2 N is interpreted as the rolling resistance and the term increasing with $v^{2}$ as the air resistance."* Isto valida diretamente o modelo $F_{\text{drag}} \propto v^{2}$ — incluído o coeficiente $\tfrac{1}{2}\rho C_{d}A$ — para ciclistas em posição "fully dropped". Martin et al. (J. Appl. Biomech. 14, 276–291, 1998) validaram um modelo completo de potência baseado no arrasto quadrático com $R^{2} = 0{,}97$ contra medidas de campo.

O modelo linear ($F \propto v$) aparece neste problema mais como **exercício pedagógico** que como descrição realista — equivale a tratar o ciclista como uma "esfera viscosa em fluido viscoso". Sua única virtude prática é gerar EDOs lineares analiticamente tratáveis (soluções exponenciais), enquanto o modelo quadrático já requer funções hiperbólicas.

---

## 7. Abordagens em Diferentes Níveis Matemáticos

### 7.1 Nível Física 1 (introdutório)

Em uma disciplina introdutória, basta:
1. Escrever $F_{\text{prop}} = F_{\text{drag}}$ em regime estacionário (sem invocar EDO).
2. Calcular $P = F\cdot v$.
3. Escrever $E/D = P_{\text{total}}/v = P_{0}/v + (\text{termo de arrasto})$.
4. Minimizar via cálculo elementar: $d(E/D)/dv = 0$.
5. Obter $v^{*}_{\text{lin}} = \sqrt{P_{0}/b}$ ou $v^{*}_{\text{quad}} = (P_{0}/2c)^{1/3}$.

Este tratamento corresponde ao primeiro exemplo de "função soma de duas potências de $v$" típico de cálculo do primeiro semestre, e é precisamente o que aparece nos capítulos 6–7 do *University Physics* da OpenStax (§6.4 "Drag Force and Terminal Speed").

### 7.2 Nível intermediário (Mecânica/EDOs)

Inclui:
- Resolução explícita da EDO $m\dot v = F_{0} - bv$ com solução exponencial $v(t) = v_{\infty}(1 - e^{-t/\tau})$.
- Resolução da EDO $m\dot v = F_{0} - cv^{2}$ via separação de variáveis e função $\operatorname{arctanh}$, dando $v(t) = v_{\infty}\tanh(t/\tau)$.
- Integração para a posição: $x(t)$ exponencial vs. $x(t) = v_{\infty}\tau\ln\cosh(t/\tau)$.
- Discussão do tempo de relaxação $\tau = m/b$ (linear) vs. $\tau = m/(cv_{\infty}) = \sqrt{m/(cF_{0})}$ (quadrático).

Estes desenvolvimentos seguem o tratamento clássico do Thornton & Marion (*Classical Dynamics*, cap. 2) e do Taylor (*Classical Mechanics*, cap. 2.4).

### 7.3 Nível avançado

- **Análise de regimes de validade:** o limite $\mathrm{Re} \to 1$ marca a transição entre os dois modelos; em algumas aplicações (Reynolds intermediários) usa-se um modelo combinado $F = bv + cv^{2}$, cuja EDO admite solução analítica fechada mas mais complexa (Hernández, Marquina & Gómez, Eur. J. Phys. 34, 1227, 2013, usaram precisamente esta forma para modelar Usain Bolt nos 100 m).
- **Cálculo variacional:** se a velocidade não for restrita a constante (por exemplo, em terreno variável ou contra vento variável), a pergunta de minimizar $\int_{0}^{D} (E/D)\,dx$ torna-se um problema de Euler–Lagrange. Para terreno plano e sem vento, contudo, demonstra-se trivialmente que o ótimo é constante (a função custo depende apenas de $v$, não de $x$ ou $\dot v$). Esta análise variacional é o ponto de partida das otimizações de pacing strategy em time trials (Gordon, Sports Eng. 2005; Bos, Slawinski et al., arXiv:2201.06788, 2022; De Jong et al., Eur. J. Appl. Math. 28, 2018).
- **Modelos completos:** Olds et al. (J. Appl. Physiol. 75, 730–737, 1993) e Martin et al. (1998) acrescentam ao termo quadrático contribuições de resistência ao rolamento, energia cinética rotacional das rodas, drafting, eficiência da transmissão (medida em 97,7% por Martin et al.), e correções de altitude/umidade. O modelo resultante prevê o desempenho real com erro de poucos por cento.
- **Modelo de cyclist em terreno variável:** D'Alessio (Eur. J. Phys. 42, 025804, 2021) deriva a EDO completa $[1 + (y')^{2}]\ddot x + y'y''\dot x^{2} = -f_{\text{air}}\sqrt{1+(y')^{2}}/M + P/(M\dot x) - gy' - \mu(g + y''\dot x^{2})$, admitindo ambas as formas $f_{\text{air}} = k(v - V_{w})$ ou $f_{\text{air}} = \tfrac{1}{2}\rho A C_{d}(v - V_{w})^{2}$, e mostra que reduzir-se ao terreno plano recupera as soluções discutidas acima.

---

## 8. Discussão

### 8.1 Comparação direta das duas previsões

Os dois modelos dão respostas qualitativamente similares — ambos predizem a existência de um ótimo interno — mas quantitativamente diferentes:

1. **Escala:** $v^{*}_{\text{lin}} \propto P_{0}^{1/2}$, enquanto $v^{*}_{\text{quad}} \propto P_{0}^{1/3}$. Aumentar a potência basal em um fator 4 aumenta $v^{*}_{\text{lin}}$ em fator 2 mas $v^{*}_{\text{quad}}$ em apenas fator $\sim 1{,}59$.
2. **Profundidade do mínimo:** o gráfico de $E/D(v)$ no modelo linear é mais raso ao redor do ótimo (o lado direito sobe linearmente), enquanto no quadrático é mais íngreme (o lado direito sobe quadraticamente). Em termos práticos: pedalar 20% acima de $v^{*}_{\text{quad}}$ "custa" relativamente mais energia que pedalar 20% acima de $v^{*}_{\text{lin}}$, em proporção.
3. **Equilíbrio no ótimo:** no modelo linear, basal e arrasto contribuem igualmente; no quadrático, basal contribui com $2/3$ e arrasto com $1/3$ do total. No ótimo quadrático, portanto, o ciclista está sempre limitado mais pelo seu metabolismo basal do que pelo arrasto.

### 8.2 Limites práticos

- Em ciclismo competitivo, a pergunta relevante não é "minimize energia por distância" mas "minimize tempo para distância fixa, sujeito a energia disponível" — um problema diferente (com solução geralmente de potência constante em pista plana sem vento, conforme Gordon 2005 e De Jong et al., Eur. J. Appl. Math. 28, 2018).
- A "potência basal" $P_{0}$ relevante para a velocidade ótima não é exatamente a BMR clínica, mas inclui o trabalho interno de manter os membros oscilando e a postura sobre a bike. Estimativas empíricas (di Prampero 1986; Burke, *High-Tech Cycling*; Wilson, *Bicycling Science*) sugerem que ela constitui uma fração significativa da potência total para velocidades baixas a moderadas.
- Para velocidades muito baixas, o modelo falha porque o equilíbrio se torna instável (não se consegue pedalar abaixo de ~5 km/h sem cair); para velocidades muito altas, o modelo falha porque entra o limite anaeróbico do ciclista (potência máxima sustentável).
- Ventos modificam o resultado substancialmente: substitui-se $v$ por $v - V_{w}$ na fórmula de arrasto, e o ótimo se desloca (para baixo em contra-vento, para cima em vento a favor).

### 8.3 Onde está o ótimo no mundo real?

A literatura sugere que, para um/a ciclista recreativo/a típico/a em estrada plana sem vento, $v^{*}_{\text{quad}}$ cai na faixa de 4–6 m/s (~14–22 km/h), consistente com a velocidade naturalmente adotada por cicloturistas. Para profissionais, $P_{0}$ é maior (em parte porque a "potência sustentável" inclui mais que a BMR), e $v^{*}$ sobe para a faixa de 8–11 m/s.

---

## 9. Recomendações (para uso pedagógico do problema)

1. **Para Física I:** apresente apenas o modelo linear; ele é matematicamente acessível (apenas álgebra e cálculo elementar) e ilustra o conceito-chave do trade-off basal-vs-arrasto com $v^{*}_{\text{lin}} = \sqrt{P_{0}/b}$.
2. **Para Mecânica intermediária:** acrescente o modelo quadrático e a derivação das soluções $v(t) = v_{\infty}\tanh(t/\tau)$ e $x(t) = v_{\infty}\tau\ln\cosh(t/\tau)$, contrastando-as com as exponenciais do caso linear.
3. **Para um seminário ou projeto avançado:** discuta a validade dos regimes pelos números de Reynolds, faça medições de coast-down para estimar $b$ ou $c$, e compare as previsões com dados reais (Wilson 2004; Martin et al. 1998).
4. **Critério de mudança de recomendação:** se o aluno precisar comparar com dados experimentais, **sempre use o modelo quadrático** — o linear é inadequado para qualquer velocidade $\gtrsim 1$ m/s em ar. Como anúnciado por Timmerman & van der Weele (Am. J. Phys. 67, 538, 1999), o modelo linear só é válido para Re < 1.

---

## 10. Caveats e Limitações

1. **A potência basal $P_{0}$ é, em rigor, uma simplificação:** estudos modernos (Belli & Hintzy 2002; di Prampero 1986) mostram que o gasto interno depende fracamente da cadência de pedalada e da velocidade de encurtamento muscular — efeitos da segunda ordem que aqui ignoramos.
2. **A resistência ao rolamento foi absorvida em $P_{0}$:** rigorosamente ela é linear em $v$ (potência $\propto v$) e portanto somar-se-ia ao termo $bv$ no modelo linear, ou apareceria como termo adicional no modelo quadrático. Esta ambiguidade pode ser explorada didaticamente.
3. **Drag crisis:** medidas CFD recentes (Forte et al., Int. J. Env. Res. Public Health 17, 3430, 2020) mostram que $C_{d}$ não é estritamente constante — ele cai entre $\mathrm{Re} \sim 10^{5}$ e $10^{6}$ ("drag crisis") em até 30%. O modelo $cv^{2}$ com $c$ constante é, portanto, uma aproximação.
4. **A eficiência da transmissão é alta mas não unitária:** Martin et al. (1998) mediram 97,7%; correções desta ordem podem ser incorporadas multiplicando $P_{\text{drag}}$ por $1/\eta$.
5. **A "minimização da energia por distância" é apenas uma das funções-objetivo possíveis.** Para minimizar tempo, a estratégia é diferente (potência constante máxima sustentável); para minimizar fadiga, considera-se um modelo de "energia anaeróbica" finita (modelo de Morton/Skiba/Coggan).
6. **Não há, na literatura cicloesportiva peer-reviewed, um único artigo que derive a forma fechada $v^{*}_{\text{lin}} = \sqrt{P_{0}/b}$ E $v^{*}_{\text{quad}} = (P_{0}/2c)^{1/3}$ no mesmo lugar.** A literatura de vôo de aves (Pennycuick, Ibis 111, 525, 1969; Hedenström & Alerstam, Phil. Trans. R. Soc. B 348, 471, 1995) fornece o análogo mais próximo: para a potência de vôo $P(V) = A/V + BV^{3} + C$, a velocidade de máximo alcance $V_{\text{mr}}$ é obtida exatamente da condição $d(P/V)/dV = 0$, idêntica à do nosso problema. O esquema aqui apresentado deve, portanto, ser entendido como uma **síntese pedagógica** que reúne resultados de regimes de drag (Timmerman & van der Weele 1999), modelos de potência ciclística (Martin et al. 1998; Olds et al. 1993, 1995; di Prampero et al. 1979) e princípios de otimização da locomoção animal (Pennycuick; Hedenström & Alerstam).