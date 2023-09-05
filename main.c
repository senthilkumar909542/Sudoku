#include <stdio.h>


int checkgird(int arr[9][9],int num,int r,int c){
  
    int row = (r<=2)?0:(r<=5)?3:6;
    int col = (c<=2)?0:(c<=5)?3:6;
   
  
             for(int i=row;i<row+3;i++){
                
                 for(int j=col;j<col+3;j++){
                     
                     if(!(r==i && c==j)){
                         if( num == arr[i][j]){
                              printf("\nDuplicate occurs in gird!!");
                              return 1;
                         }
                     }
                 }
            }
        
        
    return 0;
}

int check_row(int arr[9][9],int num,int r,int c){
    
        for(int x=0;x<9;x++){
            if( !(x==r) ){
                 if(num == arr[x][c]){
                    printf("\nDuplicate occurs in column!!");
                    return 1;
                }
            }
               
        }
  
    return 0;
}
int check_column(int arr[9][9],int num,int r,int c){
    
    for(int x=0;x<9;x++){
            if( !(x==c) ){
                 if(num == arr[r][x]){
                    printf("\nDuplicate occurs in row!!");
                    return 1;
                }
            }
               
        }
  
   
    return 0;
}
int main()
{

    int arr[9][9];
    for(int i=0;i<9;i++){
        for(int j=0;j<9;j++){
            arr[i][j]=0;
        }
    }
    /*   Random Number */
    arr[1][8]=1;
    arr[4][2]=2;
    arr[6][2]=3;
    arr[5][0]=4;
    arr[7][1]=5;
    arr[0][7]=7;
    arr[4][8]=8;
    arr[8][5]=9;
    
    int num,r,c;
    int count =3;
   
    while(1){
        for(int i=0;i<9;i++){
         if(i%3==0){
                printf("---------------------\n");
            }
            for(int j=0;j<9;j++){
               if(j%3==0){
                printf("|");
               }
               printf("%d ",arr[i][j]);
            }
         
        printf("\n");
        }
    
        printf("\nEnter the number & position(row and column):"); 
    
        scanf("%d %d %d",&num,&r,&c);

        if(arr[r][c]!=0){
            
          printf("\nTry another box!!");
          
        }else{
            
          if(!(num==0)){
              
            arr[r][c]=num;
            
            if(checkgird(arr,num,r,c)==1 || check_row(arr,num,r,c)==1 || check_column(arr,num,r,c)==1){
                
              arr[r][c]=0;
              
              count--;
              
              printf("\nRemaining chance:%d",count);
              
            }
            
            if(count == 0){
                
              printf("\nGame over!!");
              
              break;
            }
            }else{
                   printf("\nEnter the number greater than 0 or lesser than 9 !!");
            }
        }
    }

    return 0;
}
