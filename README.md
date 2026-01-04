How to setup automation script:
1. https://reqres.in/api/users?page=2 Automation script
  - Ensure you have Postman application installed.
  - Download Assignment MIFX.postman_collection.json file from the github to your system
  - In Postman App, click Import -> then in the Import window, you can drag and drop the downloaded file. Alternatively, you can click "select files or folders" then select files there.
   <img width="1913" height="1027" alt="image" src="https://github.com/user-attachments/assets/859b5026-70e0-4907-892a-7366ac0dcd06" />
  - After import is done, open the automation script and can run it by clicking "Send" button.

2. https://www.saucedemo.com/ Automation script
   - Ensure node.js and playwright browser tools (chromium) are installed
   - Download the ui_automation.test.js from the github to your system
   - In your terminal/cmd, change directory to the file location
   - Then type <pre>npx playwright test ui_automation.test.js --headed --browser=chromium </pre>
   - playwright will run the test and once its completed, it will show the test result in the terminal/cmd<img width="1108" height="626" alt="image" src="https://github.com/user-attachments/assets/bb96dffd-1b97-4f16-b0f3-274402d909ae" />
