const refreshSection = (id) => {
  $(document).ready(() => {
    $(`#${id}`).load(window.location.href + ` #${id}>*`, "");
  });
};

window.onload = () => {
    const category ="rice"
    const section = "pills-ramen-center"

    fetchByCategory(category,section)
}

const fetchByCategory = (category,section) => {
    $(`#${section}`).html("")

  if (category.length > 0) {
    $.get(`/food-item/api/category/${category}`, (data) => {
      console.log(data)
data.forEach((item)=>{
    $(`#${section}`).append(
    `       
        <div class="col-lg-4 col-md-6">
          <div class="single-item-wrap">
            <div class="thumb">
              <img
                src="${item.img}"
                alt="img"
              />
              <a class="fav-btn" href="#"><i class="ri-heart-line"></i></a>
            </div>
            <div class="wrap-details">
              <h5>
                <a href="/food-item/find/${item._id}">${item.name}</a>
              </h5>
              <div class="wrap-footer">
                <div class="rating">
                  4.9
                  <span class="rating-inner">
                    <i class="ri-star-fill ps-0"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-half-line pe-0"></i>
                  </span>
                  (928)
                </div>
                <h6 class="price">$${parseFloat(item.price).toFixed(2)}</h6>
              </div>
            </div>
            <div class="btn-area">
              <a
                class="btn btn-secondary"
                href="/food-item/find/${item._id}"
                >VIEW
              </a>
            </div>
          </div>
        </div>
  `)
})
    

    });
  }
};

$("#pills-tab").on("click",".nav-link",function(e){
    e.preventDefault();
    let category = $(this).attr("category")
    let section = $(this).attr("section")

  fetchByCategory(category,section)

})