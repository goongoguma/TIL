https://edgeguides.rubyonrails.org/getting_started.html

- $rails generate controller Welcome index 커맨드를 사용하면 Welcome 컨트롤러와 index 액션을 생성
- Welcome 컨트롤러의 파일은 app/controllers/welcome_controller.rb에서 확인할 수 있음
- 해당 컨트롤러의 view 파일은 app/views/welcome/index.html.erb에서 확인가능
- Welcome 컨트롤러의 view파일인 index.html.erb의 내용을 localhost:3000/welcome/index에서 보여주고싶음
- routes.rb파일 설정해주기
  ```js
  Rails.application.routes.draw do
    get 'welcome/index'

    root 'welcome#index'
  end
  ```
- root 'welcome#index'는 레일즈에게 어플리케이션의 루트(즉, 그냥 localhost)에 Welcome 컨트롤러의 index 액션을 묶어놓으라고 설정한것이고 get 'welcome/index'는 localhost:3000/welcome/index의 요청을 레일즈에 묶어놓으라고 하는것(get 'welcome/index'는 컨트롤러가 만들때 자동으로 생성됨)
- 지금까지 컨트롤러와 컨트롤러의 액션 그리고 뷰를 생성해봤다.
- 새로운 리소스를 생성해보고(리소스란 비슷한 객체의 집합이라는 용어) CRUD 기능을 만들어보자
- 레일즈에서는 REST를 위해 resources라는 메소드를 제공해준다.
- routes.rb에 resource를 추가해보자
  ```js
  Rails.application.routes.draw do
    get 'welcome/index'
    
    resources :article

    root 'welcome#index'
  end
  ```
- rails routes 커맨드를 실행하면 RESTful 액션을 위해 정의된 라우트들을 확인할 수 있다. 즉 articles의 라우트들과 액션들을 확인할 수 있다.
- 다음으로 articles를 create와 read 할 수 있게 만들어보자
- 첫번째로 어플리케이션에서 새로운 article을 create할 장소인 /articles/new를 만들어 볼 것.
- rails routes 커맨드를 통해 확인했듯이 라우트는 이미 정의되어 있다.
- 하지만 곧바로 localhost:3000/articles/new에 들어가면 uninitialized constant ArticlesController에러가 뜬다.
- 이 에러는 articles의 컨트롤러가 없어서 발생하는것.
- $ rails generate controller Articles를 이용해 articles 컨트롤러를 생성해보자
- 새로 생성된 articles_controller.rb 컨트롤러 파일을 보면 안이 비어있는 컨트롤러다.
  ```js
  class ArticlesController < ApplicationController
  end
  ```
- 컨트롤러는 ApplicationController에서 상속받는 단순 클래스이고 이 클래스 안에서 해당 컨트롤러의 액션이 되는 메소드들을 정의한다. 이러한 액션들은 컨트롤러안에서 CRUD를 실행.
- Articles 컨트롤러를 만들었지만 localhost:3000/articles/new에 들어가면 The action 'new' could not be found for ArticlesController라는 에러가 발생한다. 
- 이 에러를 해석하면 레일즈는 new 액션을 Articles의 컨트롤러(ArticlesController)안에서 못찾는다는것. 왜냐하면 컨트롤러는 생성될 때 주로 비어있기 때문.
- articles_controller.rb 파일을 열고 ArticlesController 클래스 안에 new 메소드를 정의해보자.
  ```js
  class ArticlesController < ApplicationController
    def new
    end
  end
  ```
- 다시 localhost:3000/articles/new에 들어가면 다른 에러가 보일것.
- ArticlesController#new is missing a template for request formats: text/html
- 레일즈가 new 메소드와 연관된 화면에 정보를 보여주는 뷰를 못찾아서 발생함.
- 레일즈는 articles안에 있는 new 템플릿을 찾고 만일 new 템플릿이 articles안에 없다면 application의 new 템플릿을 찾는다. 왜냐하면 ArticlesController는 ApplicationController를 상속받기 때문
- articles의 new 메소드와 연관된 파일인 new.html.erb를 app/views/articles안에 만들어야한다.
- 여기서 이름이 중요한데 첫번째는 해당 템플릿의 포맷이고 두번째는 템플릿을 화면에 렌더링 하기위한 핸들러이다. 
- 레일즈는 이름따라 어플리케이션 안의 app/views안의 articles/new의 템플릿을 찾을것.
- new.html.erb에서 erb는 embed ruby html이라는뜻.
- app/views/articles안에 new.html.erb파일을 생성해보고 컨텐츠를 작성해보자
  ```html
  <h1>New Article</h1>
  ```
- 작성한뒤 다시 localhost:3000/articles/new에 들어가면 타이틀을 확인할 수 있다.



- 템플릿 안에서 폼을 생성하기 위해 form builder를 사용할것.
- form builder는 레일즈의 메소드 form_with를 이용해 생성할 수 있다. 
- 이 메소드를 사용하기위해 new.html.erb 파일에 해당 템플릿을 복붙해라.
  ```js
  <%= form_with scope: :article, local: true do |form| %>
    <p>
      <%= form.label :title %><br>
      <%= form.text_field :title %>
    </p>
  
    <p>
      <%= form.label :text %><br>
      <%= form.text_area :text %>
    </p>
  
    <p>
      <%= form.submit %>
    </p>
  <% end %>
  ```
- 복붙하고 새로고침을 하면 폼이 완성되있는 모습을 볼 수 있다. 
- form_with를 호출할때 이 폼을 위한 스코프를 전달해 줄 수 있다.
- 위의 양식같은 경우 :article인데 이것은 form_with가 무엇을 위한건지 알려준다.
- 이 폼안에는 FormBuilder 객체들이 있는데 이것들은 두개의 라벨과 텍스트 박스를 만들어준다. 
- 마지막으로 form 객체의 submit을 호출하면 폼의 제출 버튼을 생성한다.
- 문제가 있는데 현재 들어가있는 articles/new 라우트는 새로운 글들을 위한 페이지로서 폼 생성에는 알맞지 않다.
- 그래서 폼 작성을 위한 create 페이지를 생성할 것.
- new.html.erb의 윗부분을 이렇게 고쳐라
  ```js
  <%= form_with scope: :article, url: articles_path, local: true do |form| %>
  ```
- articles_path 메소드는 :url 옵션에 전달되어지는데 자세한 내용을 보고싶으면 rails routes 커맨드를 참고하자. 
- The articles_path helper tells Rails to point the form to the URI Pattern associated with the articles prefix; and the form will (by default) send a POST request to that route. This is associated with the create action of the current controller, the ArticlesController.
- 폼에 글을 쓰고 submit을 하게되면 No route matches [POST] "/articles/new" 에러가 발생한다.
- 이제 ArticlesController안에 create 액션을 생성해보자.
  ```js
  class ArticlesController < ApplicationController
    def new
    end

    def create
    end
  end
  ```
- 폼을 작성하고 save article 버튼을 누르면 페이지에 아무런 변화가 없는것처럼 보이지만 정상적으로 작동하고있는것. 
- 왜냐하면 response를 구체화하지 않는다면 레일즈는 기본적으로 204 No Content를 리턴한다.
- 폼이 보내졌을때 우리가 폼에 작성했던 내용들은 레일즈에게 매개변수의 형태로 전달되어진다. 
- 이 매개변수들은 컨트롤러의 액션안에서 참조되어지며 보통 어떤 종류의 일을 수행한다.
- 만약 매개변수들이 어떤 모습인지 확인하고 싶다면 create 액션을 아래와 같이 바꿔라. 
  ```js
  def create
    render plain: params[:article].inspect
  end
  ```
- 여기서 render 메소드는 :plain을 키로 params[:article].inspect를 값으로 가지고있는 간단한 해시 형태를 하고있다.
- params 메소드는 폼에 작성된 내용을 받고있는 매개변수의 형태를 가지고있는 객체이다. 
- Ensure you have a firm grasp of the params method, as you'll use it fairly regularly. Let's consider an example URL: http://www.example.com/?username=dhh&email=dhh@email.com. In this URL, params[:username] would equal "dhh" and params[:email] would equal "dhh@email.com".
- 폼을 다시한번 submit하게되면 아래와 같은 메세지가 나온다. 
  ```js
  <ActionController::Parameters {"title"=>"yo", "text"=>"watup"} permitted: false>
  ```
- 이제 액션은 폼으로 부터 오는 article의 매개변수를 보여준다. 



- 레일즈에서 모델들은 단수명을 사용하고 이와 연관된 db테이블들은 복수명을 사용한다.
- 레일즈는 모델을 생성하기 위한 생성자를 제공한다.
- 모델을 생성하기 위해 커맨드를 실행
- $ rails generate model Article title:string text:text
- 이 커맨드를 실행함으로써 레일즈는 Article 모델과 문자열 타입을 가지고있는 title 속성과 text 속성을 생성했다.
- 또한 다양한 파일들을 생성했는데 지금은 app/models/article.rb 파일과 db/migarte/20191022104958_create_articles.rb 파일에 집중하자.
- 두번째 파일은 db구조를 생성하는데 필요한 파일이다. 
- 알다시피 rails generate model 커맨드는 db migration을 db/migrate 디렉토리에 생성했다.
- Migrations는 루비 클래스로서 db테이블 생성과 수정을 간단하게 만들어준다. 
- 레일즈는 rake 커맨드를 사용해서 migrations을 실행 할 수도 있으며 db가 적용된 이후에도 migration을 되돌릴 수 있다.
- Migration의 만들어진 시간에 따라 이름이 붙여짐
- db/migrate/YYYYMMDDHHMMSS_create_articles.rb 파일을 살펴보면 아래처럼 생김
  ```js
  class CreateArticles < ActiveRecord::Migration[6.0]
    def change
      create_table :articles do |t|
        t.string :title
        t.text :text

        t.timestamps
      end
    end
  end
  ```
- 위의 migration은 change라는 메소드를 생성했고 이 migration이 호출될때 작동할것.
- 이 파일의 정의된 액션들 또한 되돌리는것이 가능하다.
- 이 migration 파일을 사용하게되면 articles 테이블이 생성되고 articles string column과 text column이 존재한다.
- 또한 두개의 timestamp 필드를 생성함으로써 레일즈가 article의 생성과 업데이트 시간을 추적할 수 있다.
- 여기서 $ rails db:migrate 커맨드를 사용해서 migration을 실행시킬 수 있다.
- 커맨드를 실행하면 Articles table이 만들어진다.
  ```js
  == 20191022104958 CreateArticles: migrating ===================================
  -- create_table(:articles)
    -> 0.0019s
  == 20191022104958 CreateArticles: migrated (0.0020s) ==========================
  ```
- Because you're working in the development environment by default, this command will apply to the database defined in the development section of your config/database.yml file. If you would like to execute migrations in another environment, for instance in production, you must explicitly pass it when invoking the command: rails db:migrate RAILS_ENV=production.
- 다시 ArticlesController로 돌아와서, 새로운 Article 모델이 db에 데이터를 저장하게 만들기 위해 create 액션을 바꿔야한다.
- articles_controller.rb 파일을 열고 create액션을 아래와 같이 바꿔라.
  ```js
  def create
    @article = Article.new(params[:article])
  
    @article.save
    redirect_to @article
  end
  ```
- Here's what's going on: every Rails model can be initialized with its respective attributes, which are automatically mapped to the respective database columns. In the first line we do just that (remember that params[:article] contains the attributes we're interested in). Then, @article.save is responsible for saving the model in the database. Finally, we redirect the user to the show action, which we'll define later.
- You might be wondering why the A in Article.new is capitalized above, whereas most other references to articles in this guide have used lowercase. In this context, we are referring to the class named Article that is defined in app/models/article.rb. Class names in Ruby must begin with a capital letter.
- 이제 localhost:3000/articles/new에 접속해보면 에러가 뜰것.
- ActiveModel::ForbiddenAttributesError in ArticlesController#create
- 레일즈는 어플리케이션을 위해 안전장치를 몇개 만들어놓았는데 그것들중 하나.
- 이것은 strong.parameters라고 불리우며 이것은 레일즈에게 해당 컨트롤러의 액션에게 필요한 매개변수를 아래와 같이 알려줘야 한다.
  ```js
  @article = Article.new(params.require(:article).permit(:title, :text))
  ```
- 이러한 형식은 같은 컨트롤러 안에서 다시 재활용 할 수 있다. (create, update 할 때)
- 대랑의 assignment 이슈가 발생할경우 private 메소드를 사용해서 컨텍스트 바깥에서 호출되지 않게 할 수 있다.
  ```js
  def create
    @article = Article.new(article_params)
  
    @article.save
    redirect_to @article
  end
  
  private
    def article_params
      params.require(:article).permit(:title, :text)
    end
  ```



- 폼을 다시 한번 submit하게되면 'show' 액션을 찾을 수 없다고 에러가 뜬다. 
- rails routes에서 보았듯이 show는 다음과 같이 쓰일 수 있다.
  ```js
  article GET    /articles/:id(.:format)      articles#show
  ```
- :id는 레일즈에게 이 라우트는 :id 매개변수를 받아야하며 우리의 어플리케이션 안에서 article의 id가 될 것.
- 전에도 했듯이 articles_controller.rb에 show 액션을 추가해보자
  ```js
  def show
    @article = Article.find(params[:id])
  end
  ```
- 알아두어야 할 점은 우리가 찾고싶은 article을 찾기 위해 필요한 :id값을 구하기 위해 Article.find에 params[:id]를 전달해주고 있다. 
- 또한 @을 사용해서 article object의 참조를 가지고있다.
- 왜냐하면 레일즈는 모든 인스턴스 변수를 뷰에 패스하기 때문이다. 
- 이제 새로운 show.html.erb파일을 만들고 해당 컨텐츠를 붙여넣기 해보자
  ```js
  <p>
    <strong>Title:</strong>
    <%= @article.title %>
  </p>
  
  <p>
    <strong>Text:</strong>
    <%= @article.text %>
  </p>
  ```
- 이제 new article을 생성했고 localhost:3000/articles/new에 접속해서 테스트해보면 썼던 내용들이 화면에 출력되는것을 확인할 수 있다.



- 이제 index 액션을 articles_controller.rb파일에 만들어보자
- 기본적으로 액션을 새로 만들면 기존액션 위(맨 위)에다가 써준다. 
  ```js
  class ArticlesController < ApplicationController
    def index
      @articles = Article.all
    end
  
    def show
      @article = Article.find(params[:id])
    end
  
    def new
    end
  ```
- 그리고 마지막으로 index.html.erb를 생성해 articles의 뷰를 만들어주자
  ```html
  <h1>Listing articles</h1>
 
  <table>
    <tr>
      <th>Title</th>
      <th>Text</th>
      <th></th>
    </tr>
  
    <% @articles.each do |article| %>
      <tr>
        <td><%= article.title %></td>
        <td><%= article.text %></td>
        <td><%= link_to 'Show', article_path(article) %></td>
      </tr>
    <% end %>
  </table>
  ```
- 이제 localhost:3000/articles에 가보면 썼던 articles의 리스트를 확인할 수 있을것



- 이제 article들을 create하고 show하고 리스트를 볼 수 있다. 이제는 링크를 추가해보자
- welcome/index.html.erb를 열어서 다음과 같이 수정해라
  ```html
  <h1>Hello, Rails!</h1>
  <%= link_to 'My Blog', controller: 'articles' %>
  ```
- 이 링크는 article을 create하는 페이지로 이동시켜줄것
- articles/new.html.erb에 다음과 같은 양식을 복붙해라(index 액션으로 가기 위한 링크)
  ```js
  <%= form_with scope: :article, url: articles_path, local: true do |form| %>
    ...
  <% end %>
  
  <%= link_to 'Back', articles_path %>
  ```
- 그리고 index 액션으로 넘어가기 위해 articles/show.html.erb에 해당 템플릿을 복붙해라
  ```html
  <p>
    <strong>Title:</strong>
    <%= @article.title %>
  </p>
  
  <p>
    <strong>Text:</strong>
    <%= @article.text %>
  </p>
  
  <%= link_to 'Back', articles_path %>
  ```
- 이렇게 하면 이제부터 하나의 article에서 리스트 페이지로 이동할 수 있다.
