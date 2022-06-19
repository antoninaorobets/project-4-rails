class ApplicationController < ActionController::API

    include ActionController::Cookies

    def hello_world
        session[:count] = (session[:count] || 0) + 1
        render json: { count: 1 }
      end
end
