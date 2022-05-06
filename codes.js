module.exports = {
    answer: [
        //1st code
        `#include <bits/stdc++.h>
        using namespace std;
        
        int main(){
         int a,b;
         cin>>a>>b;
         int sum=a+b;
         cout<<sum<<endl;
        }`,
        //2nd code
      `#include <bits/stdc++.h>
          using namespace std;
          
          int main(){
              int number_of_elements;
              cin >> number_of_elements;
              vector <int> array(number_of_elements);
              int sum_of_array = 0;
              
              for(int i = 0; i < number_of_elements; i++){
                 cin >> array[i];
                 sum_of_array += array[i];
              }
              
              cout << sum_of_array;
              return 0;
          }
  `,
  //3rd code
      `
      #include <bits/stdc++.h>

      using namespace std;
      void comparetriplets(int a[],int b[]){
          int alice=0;
          int bob=0;
          for(int i=0;i<3;i++){
              if(a[i]>b[i]){
                  alice++;
              }
          
          else if(b[i]>a[i]){
              bob++;
          }
          }
          cout<<alice<<" "<<bob<<endl;;
      }
      
      
       
      
      int main()
      {
          int a[3],b[3];
          for(int i=0;i<3;i++){
              cin>>a[i];
          }
          for(int i=0;i<3;i++){
              cin>>b[i];
          }
          
          
        comparetriplets(a,b);
          
      }
     
  
  `,
  //4th code
      `
      #include <bits/stdc++.h>
      using namespace std;
      
      long aVeryBigSum(int ar[],int n) {
          long  s = 0;
          for (int i = 0; i < n; i++) 
          {s += ar[i];
          }
          return s;
          
      }
      int main()
      { int n;
      cin>>n;
      int a[n];
      for(int i=0;i<n;i++){
          cin>>a[i];
      }
        long res=  aVeryBigSum(a,n);
        cout<<res<<endl;
      }
          

  `,
  //5th code
      ` #include <iostream>
  using namespace std;
  int main() {
      int n;
      cin >> n;
      int arr[n][n];
      long long int d1=0; //First Diagonal
      long long int d2=0; //Second Diagonal
      for (int i = 0; i < n; i++) {
          for (int j = 0; j < n; j++) {
              cin >> arr[i][j];
              if (i == j) d1 += arr[i][j];
              if (i == n - j - 1) d2 += arr[i][j];
          }
      }
      cout << abs(d1 - d2) << endl; //Absolute difference of the sums across the diagonals
      return 0;
  }`
    ],
  };