using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Scaffolding.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DbContextScaffoldOverride
{
	public class Startup : IDesignTimeServices
	{

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
			//string connectionString = "server=localhost;user id=root;password=root;database=grainia";
			//services.AddDbContext<GrainiaDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapGet("/", async context =>
				{
					// Scaffold-DbContext "Server=localhost;Database=grainia;User=root;Password=root;TreatTinyAsBoolean=true;" Pomelo.EntityFrameworkCore.MySql -ContextDir ./ -OutputDir Models -Context InternalDbContext -DataAnnotations -Force
					await context.Response.WriteAsync("Scaffold-DbContext \"Server = localhost; Database = stc; User = root; Password = root; TreatTinyAsBoolean = true; \" Pomelo.EntityFrameworkCore.MySql -ContextDir ./ -OutputDir Models -Context InternalDbContext -DataAnnotations -Force");
				});
			});
		}

		public void ConfigureDesignTimeServices(IServiceCollection serviceCollection)
		{
			serviceCollection.AddSingleton<ICSharpDbContextGenerator, CustomCSharpDbContextGenerator>();
		}
	}
}
