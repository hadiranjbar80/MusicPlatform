using Application.Albums;
using AutoMapper;
using Domain.Models;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Album, AlbumListDto>()
                .ForMember(a => a.Cover, x => x.MapFrom(z => z.Cover))
                .ForMember(a => a.Title, x => x.MapFrom(z => z.Title))
                .ForMember(a => a.Type, x => x.MapFrom(z => z.Type))
                .ForMember(a => a.ReleaseDate, x => x.MapFrom(z => z.ReleaseDate));
        }
    }
}