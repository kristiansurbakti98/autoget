name: Pharos GM Bot

on:
  schedule:
    - cron: '0 */6 * * *'
  workflow_dispatch:

jobs:
  pharos-gm:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Clone Pharos Bot (WORKING REPO)
        run: |
          git clone https://github.com/versiaever/Pharos-Testnet-Bot.git pharos-bot
          
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          
      - name: Install dependencies
        run: |
          cd pharos-bot
          pip install -r requirements.txt
          pip uninstall -y web3 eth-account
          pip install web3==6.15.0 eth-account==0.11.0
          
      - name: Create accounts.txt
        run: |
          cd pharos-bot
          echo "${{ secrets.PHAROS_PRIVATE_KEY }}" > accounts.txt
          
      - name: Run Pharos GM Bot (bot1.py)
        run: |
          cd pharos-bot
          python bot1.py
