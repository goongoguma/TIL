 페이지네이션 필요 state
currentPage -> 현재 페이지 상태
itemsPerPage -> 현재 페이지에서 보여줄 데이터의 갯수
pageNumberLimit -> 화면에 나타낼 페이지의 갯수 (예: 1,2,3,4,5 -> 5개의 페이지)
minpageNumberLimit -> 페이지를 pageNumberLimit에 맞춰 자르기 위한 시작점
maxpageNumberLimit -> 페이지를 pageNumnberLimit에 맞춰 자르기 위한 끝점

const page = [];

1. page 배열에 데이터의 길이 / 페이지에서 보여줄 갯수를 나누면(200 / 5 = 40) 전체 페이지네이션의 길이가 나옴

2. 길이가 40인 page 배열을 map을 돌려서 나열해주는데 만일 그대로 map을 사용한다면 1부터 40까지의 페이지네이션이 화면에 나열될것. 이때 페이지의 번호가 maxPageNumberLimit 보다 같거나 작고 minPageNumberLimit보다 크다는 조건문을 사용하면 1부터 5까지의 페이지가 먼저 렌더됨

3. Next버튼을 클릭하면 다음페이지로 Prev버튼을 클릭하면 전페이지로 옮겨가는 기능을 추가해야함

4. 하지만 마지막 페이지에서 Next버튼을 클릭하면 페이지 이동뿐만 아니라 페이지의 모든 번호가 다음 페이지로 바뀌어야함 (ex: 5에서 next버튼을 클릭하면 6,7,8,9,10으로)

5. 그러기 위해서는 setCurrentPage를 이용해 currentPage의 값에 1을 더하고 추가적으로

6. currentPage + 1이 maxpageNumberLimit보다 크다면 minpageNumberLimit과 maxpageNumberLimit의 상태를 각각 minpageNumberLimit과 maxpageNumberLimit에 pageNumberLimit을 더해줘야함

7. 예를들어 pageNumberLimit이 5라고 한다면 minpageNumberLimit과 maxpageNumberLimit은 5, 10이 될것

8. Prev버튼을 클릭하면 뒤로가는 기능을 만들기 위해서는 currentPage에 1을 빼고 추가적으로

9. 현재 페이지 - 1을 pageNumberLimit으로 나눠서 나머지가 0일경우의 조건식 안에서 minpageNumberLimit과 maxpageNumberLimit에서 각각 pageNumberLimit을 빼야함 그래야지 첫번째 페이지에서 prev 버튼을 클릭했을때 그 전 페이지로 이동할테니까 (예: 6페이지에서 prev클릭 -> 1,2,3,4,5로 이동)

10. 다음으로 prev페이지나 next페이지가 존재한다면 …을 만들것

11. next 페이지의 …은 페이지의 길이가 maxpageNumberLimit보다 클때, prev 페이지의 …은 minpageNumberLimit이 1보다 크거나 같을경우 만들어주면됨

