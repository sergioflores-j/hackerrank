# Problem

Recebe uma lista de débitos contendo:

- borrower: Quem pediu
- lender: Quem emprestou 
- amount: valor

Deve-se encontrar o menor balanço possível e retornar uma lista.

- Caso não seja possível, não houver valores negativos, retornar: 
```
['Nobody has a negative balance']
```
- Caso tenha múltiplas pessoas com o menor balanço, deve-se retornar uma lista ordenada alfa-numéricamente.

## Cases

- Exemplo 1:

Input:
```
[
  ['Alex', 'Claire', 5],
  ['Alex', 'John', 2],
]
```

Output:
```
['Claire']
```

- Exemplo 2:

Input:
```
[
  ['Alex', 'Claire', 5],
  ['Alex', 'John', 5],
]
```

Output:
```
['Claire', 'John']
```

- Exemplo 3:

Input:
```
[
  ['Alex', 'Claire', 5],
  ['Claire', 'Alex', 5],
]
```

Output:
```
['Nobody has a negative balance']
```

## Complexity

O(n²)