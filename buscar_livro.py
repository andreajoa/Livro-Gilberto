import requests
from bs4 import BeautifulSoup
import json

# Informações do livro
titulo_pt = "Como Vencer a Dor de Ser Trocado Por Outro"
titulo_en = "How to Overcome the Pain of Being Replaced by Someone Else"
autor = "Gilberto de Souza"

print("=== Buscando livro na Amazon Brasil ===")
try:
    # Amazon Brasil
    url_br = f"https://www.amazon.com.br/s?k={titulo_pt.replace(' ', '+')}+{autor.replace(' ', '+')}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    response = requests.get(url_br, headers=headers, timeout=10)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a', {'class': 'a-link-normal'})
        for link in links[:5]:
            href = link.get('href', '')
            if '/dp/' in href or '/product/' in href:
                print(f"Link encontrado: https://www.amazon.com.br{href}")
                break
    else:
        print(f"Erro ao acessar Amazon Brasil: {response.status_code}")
except Exception as e:
    print(f"Erro: {e}")

print("\n=== Buscando livro na Amazon USA ===")
try:
    url_us = f"https://www.amazon.com/s?k={titulo_en.replace(' ', '+')}+{autor.replace(' ', '+')}"
    response = requests.get(url_us, headers=headers, timeout=10)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a', {'class': 'a-link-normal'})
        for link in links[:5]:
            href = link.get('href', '')
            if '/dp/' in href or '/product/' in href:
                print(f"Link encontrado: https://www.amazon.com{href}")
                break
    else:
        print(f"Erro ao acessar Amazon USA: {response.status_code}")
except Exception as e:
    print(f"Erro: {e}")

print("\n=== Buscando livro na Barnes & Noble ===")
try:
    url_bn = f"https://www.barnesandnoble.com/s/{titulo_en.replace(' ', '%20')}%20{autor.replace(' ', '%20')}"
    response = requests.get(url_bn, headers=headers, timeout=10)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a', href=True)
        for link in links[:10]:
            href = link.get('href', '')
            if '/w/' in href and 'gilberto' in href.lower():
                print(f"Link encontrado: https://www.barnesandnoble.com{href}")
                break
    else:
        print(f"Erro ao acessar Barnes & Noble: {response.status_code}")
except Exception as e:
    print(f"Erro: {e}")

print("\n=== Buscando por ISBN ===")
try:
    # Tenta buscar ISBN via Google Books API
    url_api = f"https://www.googleapis.com/books/v1/volumes?q={titulo_en.replace(' ', '+')}+{autor.replace(' ', '+')}"
    response = requests.get(url_api, timeout=10)
    if response.status_code == 200:
        data = response.json()
        if 'items' in data:
            for item in data['items'][:3]:
                volume_info = item.get('volumeInfo', {})
                title = volume_info.get('title', '')
                authors = volume_info.get('authors', [])
                industry_ids = volume_info.get('industryIdentifiers', [])
                links = volume_info.get('infoLink', '')
                
                print(f"\nTítulo: {title}")
                print(f"Autor: {', '.join(authors)}")
                for id_info in industry_ids:
                    print(f"  {id_info['type']}: {id_info['identifier']}")
                print(f"Link: {links}")
    else:
        print(f"Erro ao acessar Google Books API: {response.status_code}")
except Exception as e:
    print(f"Erro: {e}")
