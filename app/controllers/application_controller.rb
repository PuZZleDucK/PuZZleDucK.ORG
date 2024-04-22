class ApplicationController < ActionController::API
  def home
    render html: "PuZZleDuck c/o Kamal - Maintenance Mode"
  end
end
