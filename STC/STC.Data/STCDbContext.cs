using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

#nullable disable

namespace STC.Data
{
	public partial class STCDbContext : InternalDbContext
	{
		public STCDbContext()
		{
		}

		public STCDbContext(DbContextOptions options)
			: base(options)
		{
		}

		public override int SaveChanges(bool acceptAllChangesOnSuccess)
		{
			OnBeforeSaving();
			return base.SaveChanges(acceptAllChangesOnSuccess);
		}

		public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
		{
			OnBeforeSaving();
			return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			// this part adds a query filter for Deleted property on all entities that have the deleted column in them
			// it automates the use of soft delete while fetching from db. It only gets the entries that are marked as not deleted (or deleted = 0)
			// help taken from https://www.meziantou.net/entity-framework-core-soft-delete-using-query-filters.htm
			// to create fetch query that fetches soft deleted entries as well, see the above link
			foreach (var entityType in modelBuilder.Model.GetEntityTypes())
			{

				var deletedProperty = entityType.FindProperty("IsDeleted");
				if (deletedProperty == null)
					continue;
				// 2. Create the query filter
				var parameter = Expression.Parameter(entityType.ClrType);
				// EF.Property<bool>(nameOfEntity, "IsDeleted")
				var propertyMethodInfo = typeof(EF).GetMethod("Property").MakeGenericMethod(typeof(bool));
				var isDeletedProperty = Expression.Call(propertyMethodInfo, parameter, Expression.Constant("IsDeleted"));
				// EF.Property<bool>(nameOfEntity, "IsDeleted") == false
				BinaryExpression compareExpression = Expression.MakeBinary(ExpressionType.Equal, isDeletedProperty, Expression.Constant(false));
				// nameOfEntity => EF.Property<bool>(nameOfEntity, "IsDeleted") == false
				var lambda = Expression.Lambda(compareExpression, parameter);
				modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
			}
		}
		/**
         * This method cancels the delete of complete record and only sets the soft delete column to 1
         **/
		private void OnBeforeSaving()
		{
			foreach (var entry in base.ChangeTracker.Entries())
			{
				switch (entry.State)
				{
					case EntityState.Added:
						UpdateDeletedProperty(entry, false);
						UpdateCreateTimeProperty(entry);
						break;
					case EntityState.Deleted:
						UpdateDeletedProperty(entry, true);
						UpdateTimeProperty(entry);
						break;
					case EntityState.Modified:
						UpdateTimeProperty(entry);
						break;
				}
			}
		}
		private void UpdateDeletedProperty(EntityEntry entry, bool value)
		{
			var deletedProperty = entry.Metadata.FindProperty("IsDeleted");
			if (deletedProperty == null)
				return;
			entry.CurrentValues["IsDeleted"] = value;
			if (value)
				entry.State = EntityState.Unchanged;
		}
		private void UpdateTimeProperty(EntityEntry entry)
		{
			var updateTimeProperty = entry.Metadata.FindProperty("UpdateTime");
			if (updateTimeProperty == null)
				return;
			entry.CurrentValues["UpdateTime"] = DateTime.UtcNow;
		}
		private void UpdateCreateTimeProperty(EntityEntry entry)
		{
			var createTimeProperty = entry.Metadata.FindProperty("CreateTime");
			if (createTimeProperty == null)
				return;
			entry.CurrentValues["CreateTime"] = DateTime.UtcNow;
		}
	}
}
