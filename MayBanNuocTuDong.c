#include<stdio.h>
#include<string.h>
#include<wiringPi.h>
#include<mariadb/mysql.h>
#include<time.h>
//
#include "lcd.h"
#include "servo.h"
#include "matrixkeyboard.h"
//
struct Product{
    int id;
    char* name;
    int price;
    int number;
};

struct HistoryTransaction{
    char* idhoadon;
    char* thoigian;
    int tongtien;
    int tienkhachtra;
    int tientralaikhach;
    char* trangthai;
};

//Variables
int loop; //Check so vong lap
int selectedProduct; //San pham hien tai dang chon
int number; //So luong san pham da chon
int priceAmount; // Tong gia tri san pham da chon
int addedFee; //So tien nguoi dung co
int selectedProducts[5]; //Mang luu gia tri san pham da chon
char* line1;//Kiem soat dong dau tien cua lcd
char* line2;//Kiem soat dong thu 2 cua lcd
char button;//Luu gia tri nut duoc bam
char *inputTyped;//Luu chuoi nhap
char *price;
struct Product products[4] = {{1, "Coca", 15, 10}, {2, "Sprite", 15, 10}, {3, "BimBim", 5, 10}, {4, "XucXich", 10, 10}};
MYSQL* mysql;

//Functions
char *ConvertIntegerToString(int number){
	char *str = NULL;

  str = (char *)malloc(sizeof(char) * 10);
  sprintf(str, "%d", number);

  return str;
}

int ConvertStringToIngeter(char *s)
{
    int num = 0;
    for (int i = 0; s[i] != '\0'; i++)
        if((s[i]<'0' || s[i]>'9') ||(i==0 && s[i]=='0'))
            return 0;
        else
            num = num * 10 + s[i] - '0';

    return num;
}
char *MergeString(char *str1, char *str2) {
  char *new_str = malloc(sizeof(char) * (strlen(str1) + strlen(str2) + 1));
  strcpy(new_str, str1);
  strcat(new_str, str2);

  return new_str;
}
char *AddChar(char *str, char c) {
  char *new_str = malloc(sizeof(char) * (strlen(str) + 2));
  int length=strlen(new_str);
  strcpy(new_str, str);
  strncat(new_str, &c,1);
  return new_str;
}
void Write(char* s,int line)
{
    ChooseLine(line);
    WriteOnLine(s);
}
int ConnectDB()
{
    mysql = mysql_init(NULL);
    if (mysql == NULL) {
        printf("Cant Connect\n");
        return 0;
    }
    char* host="localhost";
    char* user="nguye";
    char* pass="123456";
    char* db="lich_su_giao_dich_san_pham";
    if (mysql_real_connect(mysql, host, user, pass, db, 0, NULL, 0) == NULL) {
        printf("Cant Connect\n");
        return 0;
    }
    return 1;
}
int InsertHistoryTransaction(MYSQL* mysql,struct HistoryTransaction history_transaction) {
    struct HistoryTransaction* ptr = &history_transaction;
    if (ptr==NULL) {
        printf("Transaction is NULL!");
        return 0;
    }

    char* query="INSERT INTO lich_su_giao_dich (thoigian, tongtien, tienkhachtra, tienralaikhachhang, trangthai) VALUES ('";
    query=MergeString(query,history_transaction.thoigian);query=MergeString(query,"','");
    query=MergeString(query,ConvertIntegerToString(history_transaction.tongtien));query=MergeString(query,"','");
    query=MergeString(query,ConvertIntegerToString(history_transaction.tienkhachtra));query=MergeString(query,"','");
    query=MergeString(query,ConvertIntegerToString(history_transaction.tientralaikhach));query=MergeString(query,"','");
    query=MergeString(query,history_transaction.trangthai);query=MergeString(query,"')");

    int res = mysql_query(mysql, query);
    if (res != 0) {
        printf("Cant create transaction1.\n");
        return 0;
    }
    //query="UPDATE lich_su_giao_dich SET IDHoaDon = CONCAT(DATE_FORMAT(ThoiGian, '%Y%m%d - '), ID)";
    /*sprintf(query, "UPDATE lich_su_giao_dich SET IDHoaDon = CONCAT(DATE_FORMAT(ThoiGian, '%%Y%%m%%d - '), ID)");
    res = mysql_query(mysql, query);
    if (res != 0) {
        printf("Cant create transaction2.\n");
        return 0;
    } */
    return 1;
}
int UpdateProduct(MYSQL* mysql,struct Product product, int i) {
    struct Product* ptr1 = &product;
    if (ptr1==NULL) {
        printf("product is NULL!");
        return 0;
    }
    
    
    char* query = "";
    query=MergeString(query,"UPDATE san_pham SET SoLuong = ");
    query=MergeString(query,ConvertIntegerToString(product.number));
    query=MergeString(query," WHERE id=");
    query=MergeString(query, ConvertIntegerToString(i));
    
    printf("%s", query);
    MYSQL_RES* res = mysql_query(mysql, query);
    /*if (res != 0)
    {
        printf("Cant Update\n");
        return 0;
    }*/

    return 1;
}

void PaymentProcess(int selectedProducts[],int priceAmount,int userAcount)
{
    ClrLcd(0);
    // line1="Thanh toan:"+priceAmount+"k";

    //Fix
    char* price;
    line1 = "Thanh toan: ";
    price = ConvertIntegerToString(priceAmount);
    line1= MergeString(line1,price);
    Write(line1,1);
    //Fix

    delay(2000);
    if(userAcount-priceAmount>0)
    {
        ClrLcd(0);
        // line1="Tien thua:"+userAcount-priceAmount+"k";

        //Fix
        line1 = "Tien thua: ";
        price = ConvertIntegerToString(userAcount-priceAmount);
		line1=MergeString(line1,price);
        Write(line1,1);
        //Fix

        delay(2000);
    }
    //UpdateProduct();
    //Create struct transaction
    struct HistoryTransaction historyTransaction;

    time_t currentTime;
    struct tm *timeInfo;
    char timeString[20];
    time(&currentTime);
    timeInfo = localtime(&currentTime);
    strftime(timeString, sizeof(timeString), "%Y-%m-%d %H:%M:%S", timeInfo);
    historyTransaction.thoigian=timeString;

    historyTransaction.tienkhachtra=userAcount;

    historyTransaction.tientralaikhach=priceAmount-userAcount;

    historyTransaction.tongtien=priceAmount;

    historyTransaction.trangthai="Done";
    //if(InsertHistoryTransaction(mysql,historyTransaction))
    for(int i=1; i<=4; i++)
    {
		int times = selectedProducts[i];
        if(times>0)
        {
            if(UpdateProduct(mysql,products[i-1],i))
            {
                while(times>0)
                {
                    ClrLcd(0);
                    line1 = "Mua ";
                    line1=MergeString(line1,products[i-1].name);
                    Write(line1,1);
                    line2="Thanh cong";
                    Write(line2,2);
                    times--;
                    RotateServo(i);
                    delay(1000);
                }
            }
            
        }
	}
}
int GetProducts(MYSQL* mysql)
{
    char* query="select * from san_pham";
    MYSQL_RES *result;
    if (mysql_query(mysql, query) == 0) {
    result = mysql_store_result(mysql);
    if (result == NULL) {
        printf("Cant process db query\n");
        return 0;
        }
    }
    

    int num_products = mysql_num_rows(result);
    /*
    Product* products = (Product*)malloc(sizeof(Product) * num_products);
    if (products == NULL) {
        printf("Cant malloc\n");
        return 0;
    }
    */
    int i = 0;
    MYSQL_ROW row;
    while ((row = mysql_fetch_row(result)) != NULL) {
        products[i].id = atoi(row[0]);
        products[i].name = malloc(sizeof(char) * (strlen(row[1]) + 1));
        strcpy(products[i].name, row[1]);
        products[i].price = atoi(row[3]);
        products[i].number = atoi(row[4]);
        i++;
    }
    for(int i = 0; i<=3; i++)
    {
        printf("%d %s %d %d\n", products[i].id, products[i].name, products[i].price, products[i].number);
    }
    
    mysql_close(mysql);

    /*
    for (int i = 0; i < num_products; i++) {
        free(products[i].name);
    }
    free(products);
    */
    return 1;
}

void SetUp()
{
    //wiringPiSetup();
    wiringPiSetupPhys();
    SetupMatrixKeyboard();
    I2C_Setup();
    lcd_init();
    ServoSetup();
}


//Real Main
int main()
{
	SetUp();
    if(ConnectDB())
    if(GetProducts(mysql))
    while(1)
    {
        //init
        loop=0;
        selectedProduct=-1;
        number=0;
        priceAmount=0;
        addedFee=0;
        button=' ';
		inputTyped="";
		price = "";
        for(int i=1;i<=4;i++)
            selectedProducts[i]=0; //Reset gio hang

        //Nap tien
        ClrLcd(0);

        line1="Nap tien vao may";
        Write(line1,1);

		line2="Nhap: ";
		Write(line2,2);

		while(button!='D')
		{
			button=ButtonPress();
			if(button>='0' && button<='9')
            {

                //Fixhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                inputTyped=AddChar(inputTyped,button);
               // strncat(inputTyped, &button, 1);
                line2=AddChar(line2,button);
				Write(line2,2);


				//printf("\n%s %s",line2, inputTyped );
				//printf("%s", inputTyped);

                //Fixxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            }
		}
        addedFee= ConvertStringToIngeter(inputTyped);
        //
        ClrLcd(0);

        line1="Ban da nap vao ";
        Write(line1,1);

        line2=MergeString(inputTyped,"k dong!");
        Write(line2,2);


        delay(3000);

        //Chon san pham va thanh toan!
        while(1)
        {
            //Hien thi muc chon san pham
            ClrLcd(0);
            if(loop==0)
            {
                line1="Chon Sp[1-4]";
                Write(line1,1);
            }else
            {
                line1="Them Sp[1-4]";
                Write(line1,1);
            }

            line2="0:Ket thuc!";
            Write(line2,2);

            //Kiem tra bam chon san pham
            button='z';
            while(button<'0' || button>'4')
            {
                button=ButtonPress();
                if(button=='0')
                    break;
                else
                if(button>='1' && button<='4')
                {
                    //selectedProduct=ConvertCharToIngeter(button);
                    loop++;
                    number++;
                    //price = (char*)malloc(16);
                    switch(button)
                    {
                        case '1':
                            priceAmount+=products[0].price;
                            selectedProducts[1]++;
                            ClrLcd(0);

                            //Fix
                            line1 ="Da chon: ";
                            line1 =MergeString(line1,products[0].name);
                            Write(line1,1);

                            line2 = "Gio hang: ";
                            price = ConvertIntegerToString(priceAmount);
							//sprintf(price, "%d", priceAmount);
							line2 = MergeString(line2, price);
                            Write(line2,2);
                            //Fix

                            delay(2000);
                            break;
                        case '2':
                            priceAmount+=products[1].price;
                            selectedProducts[2]++;
                            ClrLcd(0);

                            //Fix
                            line1 ="Da chon: ";
                            line1 =MergeString(line1,products[1].name);
                            Write(line1,1);

                            line2 = "Gio hang: ";
                            price = ConvertIntegerToString(priceAmount);
							//sprintf(price, "%d", priceAmount);
							line2 = MergeString(line2, price);
                            Write(line2,2);
                            //Fix

                            delay(2000);
                            break;
                        case '3':
                            priceAmount+=products[2].price;
                            selectedProducts[3]++;
                            ClrLcd(0);

                           //Fix
                            line1 ="Da chon: ";
                            line1 =MergeString(line1,products[2].name);
                            Write(line1,1);
							line2 = "Gio hang: ";
							price = ConvertIntegerToString(priceAmount);
							//sprintf(price, "%d", priceAmount);
							line2 = MergeString(line2, price);
                            Write(line2,2);
                            //Fix

                            delay(2000);
                            break;
                        case '4':
                            priceAmount+=products[3].price;
                            selectedProducts[4]++;
                            ClrLcd(0);

                            //Fix
                            line1 ="Da chon: ";
                            line1 =MergeString(line1,products[3].name);
                            Write(line1,1);

                            line2 = "Gio hang: ";
                            price = ConvertIntegerToString(priceAmount);
							//sprintf(price, "%d", priceAmount);
							line2 = MergeString(line2, price);
                            Write(line2,2);
                            //Fix

                            delay(2000);
                            break;
                    }
                    break;
                }
            }
            if(button=='0')
            {
				//printf("Ket thuc");
				break;
			}

        }

	//Kiem tra lai da chon san pham nao
       if (number==0)
        {
            ClrLcd(0);
            line1="Dang tai lai...";
            Write(line1,1);
            delay(2000);
            continue;
        }
        else if(number>0)
            {
                if(priceAmount>addedFee)
                {
                    ClrLcd(0);
                    line1="Khong du tien!";
                    Write(line1,1);
                    delay(2000);

                    ClrLcd(0);
                    line1="Dang tai lai...";
                    Write(line1,1);
                    delay(2000);
                    continue;
                }
                else
                if(priceAmount<=addedFee)
                {
                    ClrLcd(0);
                    int check=0;
                    for(int i=1;i<=4;i++)
                    {
                        if(selectedProducts[i]>products[i-1].number)
                        {
                            check=1;
                            break;
                        }
                    }
                    if(check==1)
                    {
                        ClrLcd(0);
                        line1="K du so luong!";
                        Write(line1,1);
                        delay(2000);
                        continue;
                    }
                    PaymentProcess(selectedProducts,priceAmount,addedFee);
                    ClrLcd(0);
                    line1="Dang tai lai...";
                    Write(line1,1);
                    delay(2000);
                }
            }
			/*free(price);
            free(line1);
            free(line2);
            free(inputTyped);*/
    }
}
// lcd
//SDA: pin3
//SCL: pin5