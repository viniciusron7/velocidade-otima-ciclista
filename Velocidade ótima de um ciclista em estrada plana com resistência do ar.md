## 1. Problema

Ao pedalar em uma estrada plana, a resistência do ar cresce com a velocidade. Intuitivamente, pedalar devagar reduz essa resistência, mas aumenta o tempo de deslocamento. A pergunta central é:

> Existe uma velocidade ótima que minimize o esforço por distância percorrida?

A resposta depende de como definimos “esforço”. Se considerarmos apenas a energia mecânica dissipada pelo ar, a energia por metro tende a ser menor quanto menor for a velocidade. Nesse caso, a velocidade ótima seria tender a zero, o que não é fisicamente útil.

Para aparecer uma velocidade ótima realista, é necessário incluir algum custo que aumente com o tempo, por exemplo:

- metabolismo basal durante o exercício;
- perdas internas do corpo;
- potência mínima para manter postura, equilíbrio e movimento;
- perdas mecânicas constantes da bicicleta;
- resistência de rolamento.

Assim, o critério mais realista é minimizar a energia total por distância:

$$
\frac{E}{d}=\frac{\text{energia total gasta}}{\text{distância percorrida}}.
$$

---

## 2. Variáveis principais

Considere:

$$
v=\frac{dx}{dt}
$$

como a velocidade do ciclista em relação ao solo.

A velocidade relativa do ar em relação ao ciclista será:

$$
v_{\text{rel}}=v-v_{\text{vento}},
$$

onde:

- $v>0$ é a velocidade do ciclista no sentido do movimento;
- $v_{\text{vento}}>0$ representa vento a favor;
- $v_{\text{vento}}<0$ representa vento contra.

A resistência do ar deve depender de $v_{\text{rel}}$, não apenas de $v$.

---

## 3. Modelo com resistência proporcional a $v$

No modelo linear, a força de resistência do ar é:

$$
F_{\text{ar}}=-k_1 v_{\text{rel}}.
$$

Sem vento, temos:

$$
F_{\text{ar}}=-k_1 v.
$$

Supondo uma força média de pedalada constante $F_p$ e uma força de rolamento constante $F_r$, a equação de movimento é:

$$
m\frac{dv}{dt}=F_p-F_r-k_1v.
$$

Defina:

$$
A=F_p-F_r.
$$

Então:

$$
m\frac{dv}{dt}=A-k_1v.
$$

A velocidade terminal é:

$$
v_\infty=\frac{A}{k_1}.
$$

A solução para a velocidade é:

$$
v(t)=v_\infty+(v_0-v_\infty)e^{-\frac{k_1}{m}t}.
$$

Como $v=dx/dt$, a posição é:

$$
x(t)=x_0+v_\infty t+\frac{m}{k_1}(v_0-v_\infty)\left(1-e^{-\frac{k_1}{m}t}\right).
$$

Se o ciclista parte do repouso, isto é, $v_0=0$, então:

$$
v(t)=v_\infty\left(1-e^{-\frac{k_1}{m}t}\right)
$$

e

$$
x(t)=x_0+v_\infty t-\frac{m v_\infty}{k_1}\left(1-e^{-\frac{k_1}{m}t}\right).
$$

Esse modelo é matematicamente simples, mas fisicamente menos realista para velocidades normais de ciclismo, porque a resistência aerodinâmica real tende a crescer aproximadamente com o quadrado da velocidade relativa.

---

## 4. Modelo com resistência proporcional a $v^2$

No modelo quadrático, a força de arrasto é:

$$
F_{\text{ar}}=-k_2 v_{\text{rel}}^2.
$$

Sem vento:

$$
F_{\text{ar}}=-k_2v^2.
$$

A equação de movimento fica:

$$
m\frac{dv}{dt}=F_p-F_r-k_2v^2.
$$

Novamente, tomando:

$$
A=F_p-F_r,
$$

temos:

$$
m\frac{dv}{dt}=A-k_2v^2.
$$

A velocidade terminal é obtida quando $dv/dt=0$:

$$
A-k_2v_\infty^2=0.
$$

Logo:

$$
v_\infty=\sqrt{\frac{A}{k_2}}.
$$

Para $v_0=0$, a solução é:

$$
v(t)=v_\infty\tanh\left(\frac{t}{\tau}\right),
$$

onde

$$
\tau=\frac{m}{\sqrt{Ak_2}}.
$$

Como $v=dx/dt$, temos:

$$
x(t)=x_0+\frac{m}{k_2}\ln\left[\cosh\left(\frac{t}{\tau}\right)\right].
$$

Esse modelo é mais adequado para o ciclismo porque a força de arrasto aerodinâmico usualmente é modelada como:

$$
F_{\text{ar}}=\frac{1}{2}\rho C_d A_f v_{\text{rel}}^2,
$$

onde:

- $\rho$ é a densidade do ar;
- $C_d$ é o coeficiente de arrasto;
- $A_f$ é a área frontal efetiva;
- $C_dA_f$ é frequentemente chamado de $C_dA$.

Assim:

$$
k_2=\frac{1}{2}\rho C_dA_f.
$$

---

## 5. Potência perdida para o ar

A potência é dada por:

$$
P=Fv.
$$

Para o arrasto linear:

$$
F_{\text{ar}}=k_1v,
$$

então a potência perdida é:

$$
P_{\text{ar}}=k_1v^2.
$$

Para o arrasto quadrático:

$$
F_{\text{ar}}=k_2v^2,
$$

então:

$$
P_{\text{ar}}=k_2v^3.
$$

Portanto, no modelo quadrático, dobrar a velocidade aumenta a potência aerodinâmica por um fator de $2^3=8$.

Isso explica por que velocidades altas exigem muito mais esforço.

---

## 6. Energia por distância

A energia por distância é:

$$
\frac{E}{d}=\frac{P}{v}.
$$

Se a potência total exigida for $P_{\text{total}}$, então:

$$
\frac{E}{d}=\frac{P_{\text{total}}}{v}.
$$

Um modelo razoável para a potência total é:

$$
P_{\text{total}}=P_0+F_rv+P_{\text{ar}},
$$

onde:

- $P_0$ é uma potência aproximadamente constante associada ao custo metabólico de manter o corpo em atividade;
- $F_rv$ é a potência gasta contra a resistência de rolamento;
- $P_{\text{ar}}$ é a potência perdida para o ar.

---

## 7. Energia por distância no modelo linear

No modelo linear:

$$
P_{\text{ar}}=k_1v^2.
$$

Logo:

$$
P_{\text{total}}=P_0+F_rv+k_1v^2.
$$

Dividindo por $v$:

$$
\frac{E}{d}=\frac{P_0}{v}+F_r+k_1v.
$$

Para encontrar a velocidade ótima, derivamos em relação a $v$:

$$
\frac{d}{dv}\left(\frac{P_0}{v}+F_r+k_1v\right)
=-\frac{P_0}{v^2}+k_1.
$$

Igualando a zero:

$$
-\frac{P_0}{v^2}+k_1=0.
$$

Então:

$$
k_1=\frac{P_0}{v^2}.
$$

Portanto:

$$
v_{\text{ótima, linear}}=\sqrt{\frac{P_0}{k_1}}.
$$

Nesse modelo, a resistência de rolamento $F_r$ não altera a velocidade ótima, pois entra como termo constante em $E/d$.

---

## 8. Energia por distância no modelo quadrático

No modelo quadrático:

$$
P_{\text{ar}}=k_2v^3.
$$

Logo:

$$
P_{\text{total}}=P_0+F_rv+k_2v^3.
$$

Dividindo por $v$:

$$
\frac{E}{d}=\frac{P_0}{v}+F_r+k_2v^2.
$$

Derivando:

$$
\frac{d}{dv}\left(\frac{P_0}{v}+F_r+k_2v^2\right)
=-\frac{P_0}{v^2}+2k_2v.
$$

Igualando a zero:

$$
-\frac{P_0}{v^2}+2k_2v=0.
$$

Logo:

$$
2k_2v^3=P_0.
$$

Portanto:

$$
v_{\text{ótima, quadrática}}=\left(\frac{P_0}{2k_2}\right)^{1/3}.
$$

Como

$$
k_2=\frac{1}{2}\rho C_dA_f,
$$

obtemos:

$$
v_{\text{ótima, quadrática}}=\left(\frac{P_0}{\rho C_dA_f}\right)^{1/3}.
$$

---

## 9. Interpretação física

A energia por distância no modelo quadrático é:

$$
\frac{E}{d}=\frac{P_0}{v}+F_r+k_2v^2.
$$

Essa expressão possui dois efeitos opostos:

1. O termo $P_0/v$ diminui quando $v$ aumenta, porque uma viagem mais rápida dura menos tempo.
2. O termo $k_2v^2$ aumenta quando $v$ aumenta, porque a energia perdida para o ar por metro cresce com a velocidade.

A velocidade ótima ocorre quando esses dois efeitos se equilibram.

No ponto ótimo:

$$
\frac{P_0}{v}=2k_2v^2.
$$

Ou seja, no ótimo do modelo quadrático, o custo energético por distância associado ao tempo é duas vezes o custo energético por distância associado ao arrasto do ar.

---

## 10. Inclusão do vento

Com vento, a velocidade importante para o arrasto é a velocidade relativa do ar:

$$
v_{\text{rel}}=v-v_{\text{vento}}.
$$

A potência aerodinâmica realista é:

$$
P_{\text{ar}}=k_2v_{\text{rel}}^2v.
$$

Portanto:

$$
P_{\text{ar}}=k_2(v-v_{\text{vento}})^2v.
$$

A energia aerodinâmica por distância é:

$$
\frac{E_{\text{ar}}}{d}=k_2(v-v_{\text{vento}})^2.
$$

A energia total por distância fica:

$$
\frac{E}{d}=\frac{P_0}{v}+F_r+k_2(v-v_{\text{vento}})^2.
$$

Derivando:

$$
\frac{d}{dv}\left[\frac{P_0}{v}+F_r+k_2(v-v_{\text{vento}})^2\right]
=-\frac{P_0}{v^2}+2k_2(v-v_{\text{vento}}).
$$

A velocidade ótima satisfaz:

$$
2k_2(v-v_{\text{vento}})=\frac{P_0}{v^2}.
$$

Ou:

$$
2k_2v^2(v-v_{\text{vento}})=P_0.
$$

Essa é uma equação cúbica em $v$.

Se houver vento contra, então $v_{\text{vento}}<0$, e a velocidade ótima tende a ser menor.

Se houver vento a favor, então $v_{\text{vento}}>0$, e a velocidade ótima tende a ser maior.

---

## 11. Comparação entre os modelos linear e quadrático

| Modelo | Força de arrasto | Potência dissipada | Energia por distância | Velocidade ótima |
|---|---:|---:|---:|---:|
| Linear | $F=k_1v$ | $P=k_1v^2$ | $E/d=P_0/v+F_r+k_1v$ | $v=\sqrt{P_0/k_1}$ |
| Quadrático | $F=k_2v^2$ | $P=k_2v^3$ | $E/d=P_0/v+F_r+k_2v^2$ | $v=(P_0/(2k_2))^{1/3}$ |

O modelo linear prevê uma penalidade aerodinâmica mais fraca em altas velocidades. O modelo quadrático prevê crescimento muito mais intenso da potência necessária, sendo mais coerente com a experiência real do ciclismo.

---

## 12. Exemplo numérico aproximado

Considere valores típicos aproximados:

$$
\rho=1{,}2\ \text{kg/m}^3,
$$

$$
C_dA_f=0{,}40\ \text{m}^2,
$$

então:

$$
k_2=\frac12\rho C_dA_f.
$$

Logo:

$$
k_2=\frac12\cdot1{,}2\cdot0{,}40=0{,}24.
$$

Suponha ainda:

$$
P_0=80\ \text{W}.
$$

A velocidade ótima no modelo quadrático é:

$$
v_{\text{ótima}}=\left(\frac{P_0}{2k_2}\right)^{1/3}.
$$

Substituindo:

$$
v_{\text{ótima}}=\left(\frac{80}{2\cdot0{,}24}\right)^{1/3}.
$$

$$
v_{\text{ótima}}=\left(166{,}67\right)^{1/3}.
$$

$$
v_{\text{ótima}}\approx5{,}50\ \text{m/s}.
$$

Convertendo para km/h:

$$
5{,}50\cdot3{,}6\approx19{,}8\ \text{km/h}.
$$

Portanto, para esses parâmetros, a velocidade energeticamente ótima ficaria próxima de:

$$
\boxed{20\ \text{km/h}}.
$$

Esse valor não deve ser entendido como universal. Ele muda com postura, vento, massa, bicicleta, pneus, roupa, densidade do ar e eficiência fisiológica.

---

## 13. Como medir a velocidade real do ciclista

A velocidade real em relação ao solo pode ser medida por:

### 13.1 GPS

Um celular ou ciclocomputador pode registrar:

- posição;
- tempo;
- velocidade instantânea;
- velocidade média;
- distância total.

A velocidade média em um trecho é:

$$
v=\frac{\Delta x}{\Delta t}.
$$

O GPS é simples, mas pode ter erro em velocidade instantânea. Para melhorar:

- usar trechos retos e planos;
- repetir várias vezes;
- usar velocidade média em intervalos de 10 a 30 segundos;
- evitar áreas com prédios, árvores densas ou túneis.

### 13.2 Sensor de roda

Um sensor magnético ou óptico na roda mede a frequência de rotação.

Se a roda tem raio $R$, o comprimento de uma volta é:

$$
C=2\pi R.
$$

Se a roda completa $N$ voltas em um intervalo $\Delta t$, então:

$$
v=\frac{N\cdot 2\pi R}{\Delta t}.
$$

Esse método costuma ser mais preciso que GPS para velocidade instantânea, desde que o raio efetivo da roda seja bem medido.

### 13.3 Vídeo com marcações no solo

Outra possibilidade é gravar o ciclista passando por duas marcações separadas por uma distância conhecida $L$.

Se o tempo entre as marcações é $\Delta t$, então:

$$
v=\frac{L}{\Delta t}.
$$

Esse método é bom para experimento escolar ou acadêmico porque é transparente e fácil de verificar.

---

## 14. Como medir a velocidade relativa do vento

A velocidade relativa do vento em relação ao ciclista é:

$$
v_{\text{rel}}=v-v_{\text{vento}}.
$$

Mas a forma mais direta de medir $v_{\text{rel}}$ é usar um anemômetro preso à bicicleta, apontado na direção do movimento.

### 14.1 Anemômetro na bicicleta

Um pequeno anemômetro mede a velocidade do ar que chega ao ciclista. Se ele estiver alinhado com o movimento, sua leitura aproxima:

$$
v_{\text{rel}}.
$$

Com isso, não é necessário separar completamente velocidade do ciclista e velocidade do vento.

### 14.2 Estimativa usando vento ambiente

Também é possível medir o vento parado com um anemômetro fixo ou consultar uma estação meteorológica próxima.

Se o vento está alinhado com a estrada:

$$
v_{\text{rel}}=v-v_{\text{vento}}.
$$

Se o vento vem em sentido contrário, usamos $v_{\text{vento}}<0$, então:

$$
v_{\text{rel}}=v+|v_{\text{vento}}|.
$$

Se o vento vem lateralmente, o correto é usar soma vetorial:

$$
\vec v_{\text{rel}}=\vec v_{\text{ciclista}}-\vec v_{\text{vento}}.
$$

A intensidade é:

$$
|\vec v_{\text{rel}}|=\sqrt{v_{\text{ciclista}}^2+v_{\text{vento}}^2-2v_{\text{ciclista}}v_{\text{vento}}\cos\phi},
$$

onde $\phi$ é o ângulo entre a direção do ciclista e a direção do vento.

---

## 15. Estimativa da potência desenvolvida pelo ciclista

Em estrada plana, a potência mecânica necessária pode ser aproximada por:

$$
P_{\text{mec}}=P_{\text{rolamento}}+P_{\text{ar}}.
$$

A potência contra o rolamento é:

$$
P_{\text{rolamento}}=C_{rr}mgv,
$$

onde:

- $C_{rr}$ é o coeficiente de resistência de rolamento;
- $m$ é a massa total ciclista + bicicleta;
- $g$ é a aceleração da gravidade;
- $v$ é a velocidade do ciclista.

A potência aerodinâmica é:

$$
P_{\text{ar}}=\frac12\rho C_dA_f v_{\text{rel}}^2v.
$$

Logo:

$$
P_{\text{mec}}=C_{rr}mgv+\frac12\rho C_dA_f v_{\text{rel}}^2v.
$$

Se houver subida ou descida, adiciona-se o termo gravitacional:

$$
P_{\text{grav}}=mgv\sin\alpha,
$$

onde $\alpha$ é o ângulo de inclinação da pista.

Como o problema pede estrada plana, podemos tomar:

$$
\alpha=0.
$$

---

## 16. Energia necessária para gerar essa potência

A energia mecânica gasta em um intervalo de tempo é:

$$
E_{\text{mec}}=P_{\text{mec}}\Delta t.
$$

Mas o corpo humano não transforma energia metabólica em energia mecânica com 100% de eficiência. Se a eficiência muscular for $\eta$, então:

$$
E_{\text{met}}=\frac{E_{\text{mec}}}{\eta}.
$$

Como valores típicos de eficiência humana em pedalada ficam na ordem de algumas dezenas de porcento, uma aproximação comum é usar:

$$
\eta\approx0{,}20\text{ a }0{,}25.
$$

Assim:

$$
E_{\text{met}}\approx\frac{P_{\text{mec}}\Delta t}{\eta}.
$$

A energia por distância é:

$$
\frac{E_{\text{met}}}{d}=\frac{P_{\text{mec}}}{\eta v}.
$$

Se quisermos incluir o custo metabólico de base $P_0$, usamos:

$$
P_{\text{met,total}}=P_0+\frac{P_{\text{mec}}}{\eta}.
$$

Então:

$$
\frac{E_{\text{met,total}}}{d}=\frac{P_0}{v}+\frac{P_{\text{mec}}}{\eta v}.
$$

Substituindo $P_{\text{mec}}$:

$$
\frac{E_{\text{met,total}}}{d}=\frac{P_0}{v}+\frac{C_{rr}mgv+\frac12\rho C_dA_f v_{\text{rel}}^2v}{\eta v}.
$$

Simplificando:

$$
\frac{E_{\text{met,total}}}{d}=\frac{P_0}{v}+\frac{C_{rr}mg}{\eta}+\frac{\frac12\rho C_dA_f v_{\text{rel}}^2}{\eta}.
$$

Sem vento:

$$
\frac{E_{\text{met,total}}}{d}=\frac{P_0}{v}+\frac{C_{rr}mg}{\eta}+\frac{\frac12\rho C_dA_f v^2}{\eta}.
$$

---

## 17. Energia perdida pelo atrito com o ar

A força de arrasto é:

$$
F_{\text{ar}}=\frac12\rho C_dA_f v_{\text{rel}}^2.
$$

A energia perdida para o ar ao longo de uma distância $d$ é:

$$
E_{\text{ar}}=F_{\text{ar}}d.
$$

Portanto:

$$
E_{\text{ar}}=\frac12\rho C_dA_f v_{\text{rel}}^2d.
$$

A energia perdida por metro é:

$$
\frac{E_{\text{ar}}}{d}=\frac12\rho C_dA_f v_{\text{rel}}^2.
$$

A potência perdida para o ar é:

$$
P_{\text{ar}}=\frac12\rho C_dA_f v_{\text{rel}}^2v.
$$

Sem vento:

$$
P_{\text{ar}}=\frac12\rho C_dA_f v^3.
$$

---

## 18. Protocolo experimental sugerido

### Objetivo

Medir a relação entre velocidade, vento relativo e potência estimada para comparar os modelos linear e quadrático de resistência do ar.

### Materiais

- Bicicleta;
- celular com GPS ou ciclocomputador;
- sensor de velocidade na roda, se disponível;
- anemômetro portátil, se disponível;
- fita métrica ou trena;
- balança para medir massa total;
- trecho plano, reto e seguro;
- planilha para registrar dados.

### Procedimento

1. Escolher um trecho plano e reto.
2. Medir ou estimar a massa total $m$ do ciclista com a bicicleta.
3. Medir a velocidade média em diferentes ritmos: por exemplo, 10 km/h, 15 km/h, 20 km/h, 25 km/h e 30 km/h.
4. Para cada tentativa, registrar:
   - distância percorrida;
   - tempo;
   - velocidade média;
   - velocidade do vento relativo;
   - direção aproximada do vento;
   - sensação subjetiva de esforço, se desejado.
5. Repetir cada velocidade pelo menos 3 vezes.
6. Fazer medições nos dois sentidos do mesmo trecho para reduzir erro causado pelo vento.

---

## 19. Tabela de dados sugerida

| Teste | Distância $d$ | Tempo $\Delta t$ | Velocidade $v$ | Vento relativo $v_{\text{rel}}$ | Potência aerodinâmica | Potência de rolamento | Potência total |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |
| 4 | | | | | | | |
| 5 | | | | | | | |

As grandezas podem ser calculadas por:

$$
v=\frac{d}{\Delta t},
$$

$$
P_{\text{ar}}=\frac12\rho C_dA_f v_{\text{rel}}^2v,
$$

$$
P_{\text{rolamento}}=C_{rr}mgv,
$$

$$
P_{\text{total}}=P_{\text{ar}}+P_{\text{rolamento}}.
$$

---

## 20. Como comparar os modelos com os dados reais

A comparação pode ser feita ajustando os dados experimentais a duas funções.

### Modelo linear

A potência aerodinâmica prevista é:

$$
P_{\text{ar}}=k_1v^2.
$$

Então, se o modelo linear for bom, o gráfico de $P_{\text{ar}}$ contra $v^2$ deve ser aproximadamente uma reta.

### Modelo quadrático

A potência aerodinâmica prevista é:

$$
P_{\text{ar}}=k_2v^3.
$$

Então, se o modelo quadrático for bom, o gráfico de $P_{\text{ar}}$ contra $v^3$ deve ser aproximadamente uma reta.

### Critério de comparação

Pode-se comparar:

- erro médio absoluto;
- erro quadrático médio;
- coeficiente de determinação $R^2$;
- qualidade visual do ajuste gráfico.

Espera-se que, para velocidades típicas de ciclismo, o modelo quadrático se ajuste melhor que o modelo linear.

---

## 21. Conclusão

Existe uma velocidade ótima se o modelo incluir um custo associado ao tempo de deslocamento. Sem esse custo, a energia perdida para o ar por distância diminui quando a velocidade diminui, e o modelo diria que a melhor velocidade seria infinitamente pequena.

Com um modelo mais realista, a energia total por distância pode ser escrita como:

$$
\frac{E}{d}=\frac{P_0}{v}+F_r+k_2v^2.
$$

Essa função possui mínimo em:

$$
\boxed{v_{\text{ótima}}=\left(\frac{P_0}{2k_2}\right)^{1/3}}.
$$

Usando o modelo aerodinâmico realista:

$$
k_2=\frac12\rho C_dA_f,
$$

obtemos:

$$
\boxed{v_{\text{ótima}}=\left(\frac{P_0}{\rho C_dA_f}\right)^{1/3}}.
$$

O modelo com resistência proporcional a $v^2$ é fisicamente mais adequado para ciclismo em velocidades comuns. A velocidade ótima real depende de vento, postura, bicicleta, pneus, massa total, densidade do ar, coeficiente aerodinâmico e eficiência fisiológica.

Em condições típicas e com parâmetros aproximados, uma estimativa razoável pode ficar na faixa de 18 km/h a 25 km/h para deslocamento eficiente, mas esse valor deve ser ajustado com medidas reais.

