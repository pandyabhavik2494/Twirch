## Twirch

This is a search engine for Tweets which is build using Angular 7 and Solr. 
The tweets are processed using python scripts and Google Cloud APIs. 
The WebApp is hosted on an EC2 instance of AWS.  

The aim of this project was to build an end-to-end Information Retrieval solution involving content ingestion, search, topic categorisation, analytics and visualisation with focus on user experience.

------------------------------------------------------------------------------------------------------------------------------

**Tech Used :**

• Angular 7
• Solr
• Python
• Google Cloud APIs
• AWS [EC2]

------------------------------------------------------------------------------------------------------------------------------

**Details :**

• The front-end is configurable and can be pointed to any Solr Core. It is configured as a search engine for tweets as of now but it can be made into someting else too! 

• The dataset(tweets) is analysed for the impact of political rhetoric of influential people by monitoring both social and       traditional media, in terms of  sentiment, volume, among others.

• The web page allows keyword search on the dataset which can consists of millions of tweets.

• The result displayed from this search is the response obtained on faceted-search in Solr for the searched keywords.

• The visualizations depicted on the first webpage are based on the analysis performed on the entire dataset.

• The  keyword  search  feature  of  Twirch allows  one  to  search  for  any  single  word  or  a  set  of words and displays   the tweets found as a result. 

• The results of the IR model are ranked in such a way that the highest rank is given to tweets that match the query             exactly,so that a balance between precisionand recall is maintained by the model.

• The tweets having the exact match for the search text containing multiple words are displayed first which ensures a good       precision followed by the ones having either one or multiple word match to maintain a good recall. 

• The ranking  methodology  also  inculcates  the authoritative property  of  the  documents  (tweets) ensuring the tweets by   verified users are displayed first.

------------------------------------------------------------------------------------------------------------------------------

**Demo Images :**

**Home Screen :**
Here we can see the option to search keywords to find tweets.

![Twirch1](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch1.png)

------------------------------------------------------------------------------------------------------------------------------
**Analysis on all Tweets Part_1 :**

Here we can see the various inferences made from the dataset of tweets.

![Twirch2](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch2.png)

------------------------------------------------------------------------------------------------------------------------------

**Analysis on all Tweets Part_2 :**

Some more inferences made from the dataset of tweets.


![Twirch3](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch3.png)

------------------------------------------------------------------------------------------------------------------------------
**Tweet Search Result Screen :**
Here we see the search results in the form of retrieved tweets ranked according to their precision.

![Twirch4](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch4.png)


------------------------------------------------------------------------------------------------------------------------------
**Tweet Information Popup :**

We can view various details about a tweet on this popup which is opened by clicking on the tweet.

![Twirch7](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch7.png)

------------------------------------------------------------------------------------------------------------------------------
**Search Result Analysis Part_1 :**

Here we can see the various inferences made from the dataset of tweets which were retrieved based on the query.

![Twirch5](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch5.png)

------------------------------------------------------------------------------------------------------------------------------
**Search Result Analysis Part_2 :**

Some more inferences made from the dataset of tweets which were retrieved based on the query.

![Twirch6](https://github.com/pandyabhavik2494/Screenshots/blob/master/Twirch6.png)

------------------------------------------------------------------------------------------------------------------------------
**Configuration Notes**

This project was build with Angular 7 and Solr and is hosted on an AWS EC2 instance.


** Development server:

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


** Code scaffolding:

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


** Build:

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


** Running unit tests:

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


** Running end-to-end tests:

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


** Further help:

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
