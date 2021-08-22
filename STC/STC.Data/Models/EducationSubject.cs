using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("education_subject")]
    [Index(nameof(EducationMajorId), Name = "fk_education_subject_education_major1_idx")]
    public partial class EducationSubject
    {
        public EducationSubject()
        {
            CandidateHasEducations = new HashSet<CandidateHasEducation>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }
        [Column("education_major_id")]
        public int EducationMajorId { get; set; }

        [ForeignKey(nameof(EducationMajorId))]
        [InverseProperty("EducationSubjects")]
        public virtual EducationMajor EducationMajor { get; set; }
        [InverseProperty(nameof(CandidateHasEducation.EducationSubject))]
        public virtual ICollection<CandidateHasEducation> CandidateHasEducations { get; set; }
    }
}
