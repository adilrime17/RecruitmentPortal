using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Scaffolding;
using Microsoft.EntityFrameworkCore.Scaffolding.Internal;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace DbContextScaffoldOverride
{
    public class CustomCSharpDbContextGenerator : CSharpDbContextGenerator
    {

        public CustomCSharpDbContextGenerator([NotNullAttribute] IProviderConfigurationCodeGenerator providerConfigurationCodeGenerator, [NotNullAttribute] IAnnotationCodeGenerator annotationCodeGenerator, [NotNullAttribute] ICSharpHelper cSharpHelper) : base(providerConfigurationCodeGenerator, annotationCodeGenerator, cSharpHelper)
        {
        }

        protected override void GenerateOnConfiguring(string connectionString, bool suppressConnectionStringWarning)
        {

        }

        public override string WriteCode(IModel model, string contextName, string connectionString, string contextNamespace, string modelNamespace, bool useDataAnnotations, bool suppressConnectionStringWarning, bool suppressOnConfiguring)
        {
            string code = base.WriteCode(model, contextName, connectionString, contextNamespace, modelNamespace, useDataAnnotations, suppressConnectionStringWarning, suppressOnConfiguring);
            code = code.Replace("<InternalDbContext>", "");
            return code;
        }
    }
}
