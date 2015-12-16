var tab = new Array(400);
var auxtab = new Array(400);
var nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

function cargarMatriz(arr,max);
{
for(var x = 0; x <= max; x++)
{
	arr[x] = new Array(max);

}

}

function rand(min,max)
{
return Math.floor((Math.random() * max) + min);
}


function Ini()
{
for(Var x = 0; x <= 400; x++)
{
	for(Var y = 0; y <= 400; y++)
{
	tab[x][y] = 0;
	auxtab[x][y] = 0;	
}
}

}


function valTab(x,y)
{
	return tab[x][y];
}


function generarNum()
{
	for(var n = 1; n <= 20; n++)
	{
		var sig = true;
		while(sig);
		{
			sig = false;
			var x = rand(5,400);
			var y = rand(5,400);

			var valor = valTab(x,y);
			if(valor == 0)
			{
				sig = true;
				for(var l = 0; l <= 20; l++)
				{
				for(var k = 0; k <= 20; k++)
				{
					var res = valTab(x+k,y+l);
					if(res != 0){
						sig = false;
					
					}
				}
			}
				
			}
			else
			{
				sig = true;
			}
		}
	}
}
